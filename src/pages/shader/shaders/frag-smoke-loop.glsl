varying vec2 vUv;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uTime;

vec2 rotate_around_origin( vec2 v, float theta ) {
	return vec2( v.x * cos(theta) - v.y * sin(theta),
				 v.x * sin(theta) + v.y * cos(theta) );
}

vec2 rotate_around_point( vec2 v, vec2 pt, float theta ) {
	return pt + rotate_around_origin( v - pt, theta );
}

float hash21( vec2 p ) {
	float h = dot(p,vec2(127.1,311.7));	
    return 2. * fract(sin(h)*43758.5453123) - 1.;
}

vec2 hash22( vec2 v ) {
    return vec2(hash21(v), hash21(v+vec2(83.331,12.899)));
}

float bilinearInterp( float f11, float f12, float f21, float f22, vec2 interp ) {
    return mix( mix(f11, f12, interp.x), 
                mix(f21, f22, interp.x), interp.y);
}

// generates values between -1 and 1, I think
float perlin( vec2 pos, float size ) {
    vec2 coordsInGrid = fract( pos / size );
    vec2 gridPoint = pos / size - coordsInGrid;
    
    vec2 e = vec2(0.0, 1.0);
    float f11 = dot( hash22( gridPoint + e.xx ), coordsInGrid - e.xx );
    float f12 = dot( hash22( gridPoint + e.yx ), coordsInGrid - e.yx );
    float f21 = dot( hash22( gridPoint + e.xy ), coordsInGrid - e.xy );
    float f22 = dot( hash22( gridPoint + e.yy ), coordsInGrid - e.yy );
    
    
    vec2 interp = smoothstep(0., 1., coordsInGrid);
    float val = bilinearInterp( f11, f12, f21, f22, interp );
    
    return val;
}

void main() {
	vec3 color = vec3(0.0);

	// choose a vector field to displace the sample of the previous frame
	vec2 vectorField = vec2(0.0);

	// start by perturbing the base line (y = 0.1) vertically using some noise
	float noise = perlin( vUv + 0.05 * vec2(0.0, uTime), 0.1);
	vectorField = (0.3 - abs(vUv.y - 0.1)) * vec2(0.0, 0.01 * noise);

	// add an upward force that's stronger towards the top
	noise = perlin( vUv + 0.05 * vec2(0.0, 2.0 * uTime + 100.0), 0.2);
	vectorField = vectorField + vUv.y * vec2(0.0, 0.03 * noise + 0.02);

	// add a left-to-right component based on perlin noise that's stronger towards the top
	noise = perlin( vUv + 0.05 * vec2(0.0, 2.0 * uTime + 100.0), 0.2);
	vectorField = vectorField + vUv.y * vec2(0.04 * noise, 0.0);

	// translate before sampling 
	vec2 samplePoint = vUv - vectorField;
	color = color + 0.95 * texture2D(uTexture2, samplePoint).rgb;
	
 	// draw the color from the base shader in place
	color = color + texture2D(uTexture1, vUv).rgb;

	gl_FragColor = vec4(color, 1.0);
}
