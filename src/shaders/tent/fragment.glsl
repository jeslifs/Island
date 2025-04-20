void main()
{
    gl_FragColor = vec4(1.0, 0.0, 0.0, 0.9);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}