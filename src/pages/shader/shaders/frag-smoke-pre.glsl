varying vec2 vUv;
uniform float uTime;

void main() {
	// // draws a small disk
	// float d = length(vUv - vec2(0.5, 0.1));
	// d = d - 0.03;

	// draws a line
	float d = abs(vUv.y - 0.1);
	d = d - 0.0005;

	d = smoothstep(0.0, 0.01, d);
	d = 1.0 - d;

	vec3 color = 0.3 * vec3(d);

	gl_FragColor = vec4(color, 1.0);
}
