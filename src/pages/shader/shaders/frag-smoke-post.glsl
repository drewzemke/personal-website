varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;

void main() {
	vec3 color = vec3(0.0);

 	// mix the grayscale color with some color
	color = color + texture2D(uTexture, vUv).rgb;
	color = color * mix(vec3(0.9, 0.0, 0.7), vec3(1.0), color);

	gl_FragColor = vec4(color, 1.0);
}
