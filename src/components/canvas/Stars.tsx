"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { inSphere } from "maath/random";

const Stars = (props: any) => {
  const ref = useRef<any>();
  const [sphere] = useState(() => {
    const s = inSphere(new Float32Array(5001), { radius: 1.2 }) as Float32Array;
    if (s.some((v) => isNaN(v))) return new Float32Array(0);
    return s;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
