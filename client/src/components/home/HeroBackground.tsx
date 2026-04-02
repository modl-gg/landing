import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vElevation;

  void main() {
    vec3 pos = position;

    float wave1 = sin(pos.x * 0.8 + uTime * 0.6) * 0.15;
    float wave2 = cos(pos.y * 0.6 + uTime * 0.4) * 0.12;
    float wave3 = sin((pos.x + pos.y) * 0.5 + uTime * 0.3) * 0.1;

    float dist = length(pos.xy - uMouse * 8.0);
    float ripple = exp(-dist * 0.3) * sin(dist * 2.0 - uTime * 3.0) * 0.2;

    float elevation = wave1 + wave2 + wave3 + ripple;
    pos.z += elevation;

    vElevation = elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 1.5;
  }
`;

const fragmentShader = `
  varying float vElevation;

  void main() {
    vec3 blue = vec3(0.2, 0.58, 0.94);
    vec3 purple = vec3(0.58, 0.29, 0.82);

    float t = smoothstep(-0.3, 0.4, vElevation);
    vec3 color = mix(blue, purple, t);

    float alpha = smoothstep(-0.4, 0.1, vElevation) * 0.6;
    gl_FragColor = vec4(color, alpha);
  }
`;

function GridField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.lerp(mouseRef.current, 0.05);
  });

  return (
    <points ref={pointsRef} rotation={[-Math.PI / 2.5, 0, 0]}>
      <planeGeometry args={[16, 16, 100, 100]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroBackground() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
      gl={{ alpha: true, antialias: false }}
      camera={{ position: [0, 2.5, 5], fov: 60 }}
      dpr={[1, 1.5]}
    >
      <GridField />
    </Canvas>
  );
}
