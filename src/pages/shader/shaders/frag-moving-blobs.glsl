varying vec2 vUv; 
uniform vec2 uRes;
uniform float uTime;

float GRID_SIZE = 30.0;
float POINT_SIZE = 3.0;

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

// get the value of a noise pattern (should be between 0 and 1 and vary continuosly with pos)
float fieldVal( vec2 pos ) {
    // vec2 center = uRes / 2.0;
    // float distToCenter = length(pos - center);
    // return 0.5 * sin(distToCenter / 20.0 + uTime) + 0.5;
    float n = noise(pos + uTime * 10.0, 100.0);
    // n = n + noise(pos.yx + uTime * 10.0, 1200.0);
    n = 0.5 * n + 0.5;
    n = smoothstep(0.0, 1.0, n);
    n = 8.0 * pow( n - 0.5, 3.0 ) + 0.5;
    return n;
}

float DISP_MIN = 0.0;
float DISP_MAX = 1.0;

vec2 displace( vec2 pos ) {
    float field = fieldVal( pos );
    float mappedVal = 8000.0 * mix( DISP_MIN, DISP_MAX, field);
    return  vec2( dFdx(mappedVal), dFdy(mappedVal) );
}

void main() {
    vec3 color = vec3(0.0);

    float maxRes = max(uRes.x, uRes.y);
    vec2 pos = vUv * uRes;

    // vignette
    vec3 bgColor1 = vec3(16.0, 9.0, 14.0) / 255.0; // #10090E
    vec3 bgColor2 = vec3(87.0, 50.0, 78.0) / 255.0; // #57324E

    vec2 vignetteCenter = uRes / 2.0 + vec2(0.0, uRes.y / 6.0);
    float vignetteFactor = length(pos - vignetteCenter);
    color = mix(bgColor2, bgColor1, vignetteFactor / maxRes);

    // DEBUG
    // compute displacement field val and show it as bg
    float dispFieldVal = fieldVal(pos);
    color = color * vec3(pow(dispFieldVal, 0.5));

    // compute position displacement
    vec2 disp = displace(pos);
    vec2 newPos = pos + disp;

    // mat2 jacobian = mat2( dFdx(newPos), dFdy(newPos) );

    vec2 gridId = newPos / GRID_SIZE - fract(newPos / GRID_SIZE);
    vec2 gridPoint = (gridId + 0.5) * GRID_SIZE;

    // distance to given point, scaled by derivative 
    // vec2 localCoords = newPos - gridPoint;
    // vec2 adjustedCoords = inverse(jacobian) * localCoords;
    // adjustedCoords = localCoords;

    float v = length(newPos - gridPoint);

    v = v - POINT_SIZE;
    // v = smoothstep(0.0, 0.01, v );
    // v = POINT_SIZE - v;
    v = 1.0 - v;
    color = mix(color, vec3(1.0), saturate(v));

    gl_FragColor = vec4(color, 1.0);
}
