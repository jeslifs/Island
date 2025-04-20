uniform float uTime;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 newModelPosition = modelPosition;

    // wind
    newModelPosition.y += sin(newModelPosition.x * 2.0 + uTime) * 0.1;
    newModelPosition.y += sin(newModelPosition.z * 5.0 + uTime) * 0.1;
    
    vec4 viewPosition = viewMatrix * newModelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}