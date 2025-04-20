uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main()
{

    float water = texture(uPerlinTexture, vUv  - uTime * 0.02).r;

    float strength = step(0.9, sin(water * 30.));
    vec3 lightBlue = vec3(0.5, 0.7, 1.0);
    vec3 darkBlue = vec3(0.0, 0.1, 0.4);
    vec3 mixedColor = mix(darkBlue, lightBlue, strength);

    gl_FragColor = vec4(vec3(mixedColor), 0.6);
    // gl_FragColor = vec4(vec3(water), 0.5);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}