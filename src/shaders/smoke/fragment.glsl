uniform sampler2D uPerlinTexture;
uniform float uTime;

varying vec2 vUv;


void main()
{
    // scale and animate
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.3;
    smokeUv.y -= uTime * 0.03;

    float smoke = texture(uPerlinTexture, smokeUv).r;

    // remap: smoke
    smoke = smoothstep(0.4, 1.0, smoke);

    // remap: edge x
    // smoke = 1.0;
    smoke *= smoothstep(0.0, 0.1, vUv.x);
    smoke *= smoothstep(1.0, 0.9, vUv.x);

    // edge y
    smoke *= smoothstep(1.0, 0.4, vUv.y);
    smoke *= smoothstep(0.0, 0.1, vUv.y);

    gl_FragColor = vec4(1.0, 1.0, 1.0, smoke);
    // gl_FragColor = vec4(0.0, 0.0, 1.0, 1);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}