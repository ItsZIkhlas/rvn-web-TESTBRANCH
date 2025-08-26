import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function BoardModel(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/models/scene.gltf"); 
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return <primitive ref={ref} object={scene} {...props} />;
}

useGLTF.preload("/models/scene.gltf");
