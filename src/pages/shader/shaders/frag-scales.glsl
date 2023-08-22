varying vec2 vUv; 
uniform vec2 uRes;
uniform float uTime;


float hash21( vec2 p ) {
	float h = dot(p,vec2(127.1,311.7));	
    return 2. * fract(sin(h)*43758.5453123) - 1.;
}

vec2 hash22( vec2 v ) {
    return vec2(hash21(v), hash21(v+vec2(83.331,12.899)));
}

float sdfLineSegment( vec2 pos, vec2 a, vec2 b ) {
    vec2 AP = pos - a;
    vec2 AB = b - a;
    float proj = clamp( dot( AP, AB ) / dot( AB, AB ), 0., 1.);
    
    return length( AP - proj * AB );
}

float bilinearInterp( float f11, float f12, float f21, float f22, vec2 interp ) {
    return mix( mix(f11, f12, interp.x), 
                mix(f21, f22, interp.x), interp.y);
}

float noise( vec2 pos, float size ) {

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

vec2 rotate_around_origin( vec2 v, float theta ) {
	return vec2( v.x * cos(theta) - v.y * sin(theta),
				 v.x * sin(theta) + v.y * cos(theta) );
}

vec2 rotate_around_point( vec2 v, vec2 pt, float theta ) {
	return pt + rotate_around_origin( v - pt, theta );
}

float PI = 3.14159;

// `pos` is in pixels
float pattern( vec2 pos, float diamondScale, float speed, float offset, float spacing, float noiseScale ) {
    // squash horizontally 
    pos.x = 1.3 * pos.x;

    // translate vertically with time
    pos = pos - vec2(0.0, speed * (uTime + offset));

    // rotate so the square grid becomes diamonds
    pos = rotate_around_origin(pos, PI / 4.0);

    // the coordinates of the point within its gridcell
    vec2 gridCoords = fract(pos / diamondScale) - 0.5;

    // there's a better name for this value
    // something to do with the l_infinity norm? or was it the l_0 norm...
    float v = 2.0 * max(abs(gridCoords.x), abs(gridCoords.y));

    // storing v for later
    float u = v;

    // the point at the one of the corners of the grid cell
    vec2 gridPos = floor(pos / diamondScale);

    // offset animation for each diamond
    // (return t to debug)
    float t = hash21(gridPos);
    v = v + t;

    // animates each diamond without an expanding effect
    v = fract(3.0 * v - 0.9 * uTime);

    // increase contrast within each diamond
    v = v * v;

    // this is fun, not sure if I like it better 
    // v = smoothstep(0.5, 0.6, v);  

    // zeros out the diamond outside of a certain l_infinity value,
    // creating separation between the diamonds
    v = v * step(u, spacing);

    // noise value to control brightness of each diamond
    float n = noise(gridPos + speed / 100.0 * uTime * vec2(-1.0, 1.0), noiseScale);

    return v * n;
}

void main() {
    vec3 color = vec3(0.0, 0.0001, 0.0002);

    // palette
    vec3 color1 = vec3(0.03, 0.08, 0.10);
    vec3 color2 = vec3(0.44, 0.69, 0.41);
    vec3 color3 = vec3(0.96, 0.58, 0.23);

    // adjust coords
    float maxRes = max(uRes.x, uRes.y);
    vec2 pos = vUv * uRes;

    // compute patterns
    float p1 = clamp(pattern(pos, 300.0, 90.0, 900.0, 0.7, 10.0 ), 0.0, 1.0);
    float p2 = clamp(pattern(pos, 200.0, 160.0, 80.0, 0.6, 8.0 ), 0.0, 1.0);
    float p3 = clamp(pattern(pos, 100.0, 200.0, 0.0, 0.5, 5.0 ), 0.0, 1.0);

    // combine diamonds
    color = mix(color, p1 * color1, 0.8 * p1);
    color = mix(color, p2 * color2, 0.9 * p2);
    color = mix(color, p3 * color3, p3);

    // adjust colors
    color = pow( color, vec3(0.5) );

    gl_FragColor = vec4(color, 1.0);
}
