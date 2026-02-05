"use client";
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { useEffect } from 'react';

export default function SceneObj({ objUrl }: { objUrl: string }) {
  const obj = useLoader(OBJLoader, objUrl);
  
  // Center the geometry
  useEffect(() => {
    obj.traverse((child: any) => {
      if (child.isMesh && child.geometry) {
        child.geometry.center();
      }
    });
  }, [obj]);
  
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      <Center>
        <primitive object={obj} scale={0.08} />
      </Center>
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
