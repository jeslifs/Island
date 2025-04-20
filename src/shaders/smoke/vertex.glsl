uniform sampler2D uPerlinTexture;
uniform float uTime;

varying vec2 vUv;


vec2 rotate2D(vec2 value, float angle)
{
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}


void main()
{
    vec3 newPosition = position;

    // twist
    float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.x * 0.2 - uTime * 0.05)).r;
    float angle = twistPerlin * 0.3;
    newPosition.xz = rotate2D(newPosition.xz, angle);

    // wind
    // vec2 windOffset = vec2(texture(uPerlinTexture, vec2(0.3, uTime * 0.01)).r - 0.5, texture(uPerlinTexture, vec2(0.25, uTime * 0.01)).r - 0.5);
    // windOffset *= pow(uv.y, 2.0) * 10.0;
    // newPosition.xy += windOffset;


    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    

    gl_Position = projectedPosition;
    vUv = uv;
}