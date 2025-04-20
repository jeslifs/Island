uniform float uTime;
varying vec2 vUv;


void main() {

    // fire color
    vec3 fireColor = mix(vec3(1.0, 0.5, 0.0), vec3(1.0, 1.0, 0.0), vUv.x);

    // Final color output
    gl_FragColor = vec4(fireColor, 1.0);
}
