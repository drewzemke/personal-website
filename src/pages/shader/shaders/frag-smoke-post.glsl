varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;

vec3 bgColor =  0.0009 * vec3(16.0, 9.0, 14.0);
vec3 smokeColor = vec3(0.8, 0.1, 0.6);

void main() {
	vec3 color = texture2D(uTexture, vUv).rgb;

 	// mix the grayscale color with the smoke color, then add the background
	color = color * mix(smokeColor, vec3(1.0), color) + bgColor;

	gl_FragColor = vec4(color, 1.0);
}
