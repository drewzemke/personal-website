varying vec2 vUv; 
uniform vec2 uRes;
uniform float uTime;

float GRID_SIZE = 100.0;
float POINT_SIZE = 2.0;

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

vec2 hashPoint( vec2 gridId, float gridSize, float time ) {
    vec2 basePoint = hash22( gridId );
    vec2 radii = hash22( gridId + vec2(1.23, 4.56));
    float speed = 0.2 * hash21( gridId );

    vec2 ellipseOffset = radii * vec2(cos(speed * time), sin(speed * time));

    vec2 disp = vec2(0.0); //basePoint + 2.0 * ellipseOffset;
    vec2 screenPoint = (gridId + 0.5 + disp) * gridSize;
    return screenPoint;
}

vec2 displace( vec2 pos ) {
    vec2 center = uRes / 2.0;
    float distToCenter = length(pos - center);
    float scaleFactor = 0.5 * sin(distToCenter / 20.0 + 2.0 * uTime) + (cos(uTime) + 1.0);
    return (pos - center) / scaleFactor;
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

    // compute position displacement
    vec2 disp = displace(pos);
    vec2 newPos = pos + disp;

    mat2 jacobian = mat2( dFdx(newPos), dFdy(newPos) );

    vec2 gridId = newPos / GRID_SIZE - fract(newPos / GRID_SIZE);
    vec2 hashedPoint = hashPoint( gridId, GRID_SIZE, 0.0);

    // distance to given point, scaled by derivative 
    vec2 localCoords = newPos - hashedPoint;
    vec2 adjustedCoords = inverse(jacobian) * localCoords;
    // adjustedCoords = localCoords;

    float v = length(adjustedCoords);

    v = v - POINT_SIZE;
    // v = smoothstep(0.0, 0.1, v );
    // v = POINT_SIZE - v;
    v = 1.0 - v;
    color = mix(color, vec3(1.0), saturate(v));

    gl_FragColor = vec4(color, 1.0);
}
