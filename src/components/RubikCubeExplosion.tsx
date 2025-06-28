'use client';
import React, { useEffect, useRef, useState } from 'react';
import './RubikCube.css'; // Create a separate CSS file for styling

const cubieSize = 66; // 200px / 3

// The colors and layout are not visually used in the holographic style,
// but are kept for the component's structure.
const colors: Record<string, string> = {
  R: 'color-red', O: 'color-orange', G: 'color-green',
  B: 'color-blue', Y: 'color-yellow', W: 'color-white',
  X: 'hidden-face',
};

const rubikLayout = [
  // Z=0 (Lowest layer in 3D space, which appears "top" if you align a physical rubik with Y-up)
  // Y=0 (Back row)
  ['X', 'X', 'R', 'X', 'Y', 'X'], // (0,0,0) TRF - Top-Right-Front
  ['X', 'X', 'X', 'X', 'Y', 'X'], // (1,0,0) TMF - Top-Middle-Front
  ['F', 'X', 'X', 'B', 'Y', 'X'], // (2,0,0) TLF - Top-Left-Front

  // Y=1 (Middle row)
  ['X', 'X', 'R', 'X', 'X', 'X'], // (0,1,0) TRM - Top-Right-Middle
  ['X', 'X', 'X', 'X', 'X', 'X'], // (1,1,0) TMM - Center of Top Face (No physical cubie here in 3x3x3 core)
  ['F', 'X', 'X', 'B', 'X', 'X'], // (2,1,0) TLM - Top-Left-Middle

  // Y=2 (Front row)
  ['X', 'X', 'R', 'X', 'X', 'D'], // (0,2,0) TRB - Top-Right-Back
  ['X', 'X', 'X', 'X', 'X', 'D'], // (1,2,0) TMB - Top-Middle-Back
  ['F', 'X', 'X', 'B', 'X', 'D'], // (2,2,0) TLB - Top-Left-Back

  // Z=1 (Middle layer)
  // Y=0
  ['X', 'X', 'R', 'X', 'X', 'X'], // (0,0,1) MRF - Middle-Right-Front
  ['X', 'X', 'X', 'X', 'X', 'X'], // (1,0,1) MMF - Middle-Middle-Front
  ['F', 'X', 'X', 'B', 'X', 'X'], // (2,0,1) MLF - Middle-Left-Front

  // Y=1
  ['X', 'X', 'R', 'X', 'X', 'X'], // (0,1,1) MRM - Middle-Right-Middle
  ['X', 'X', 'X', 'X', 'X', 'X'], // (1,1,1) Center (Physical core, no stickers)
  ['F', 'X', 'X', 'B', 'X', 'X'], // (2,1,1) MLM - Middle-Left-Middle

  // Y=2
  ['X', 'X', 'R', 'X', 'X', 'X'], // (0,2,1) MRB - Middle-Right-Back
  ['X', 'X', 'X', 'X', 'X', 'X'], // (1,2,1) MMB - Middle-Middle-Back
  ['F', 'X', 'X', 'B', 'X', 'X'], // (2,2,1) MLB - Middle-Left-Back

  // Z=2 (Highest layer in 3D space, appears "bottom" if Y-up)
  // Y=0
  ['X', 'X', 'R', 'X', 'X', 'Y'], // (0,0,2) BRF - Bottom-Right-Front
  ['X', 'X', 'X', 'X', 'X', 'Y'], // (1,0,2) BMF - Bottom-Middle-Front
  ['F', 'X', 'X', 'B', 'X', 'Y'], // (2,0,2) BLF - Bottom-Left-Front

  // Y=1
  ['X', 'X', 'R', 'X', 'X', 'X'], // (0,1,2) BRM - Bottom-Right-Middle
  ['X', 'X', 'X', 'X', 'X', 'X'], // (1,1,2) BMM - Bottom-Middle-Middle
  ['F', 'X', 'X', 'B', 'X', 'X'], // (2,1,2) BLM - Bottom-Left-Middle

  // Y=2
  ['X', 'X', 'R', 'X', 'X', 'D'], // (0,2,2) BRB - Bottom-Right-Back
  ['X', 'X', 'X', 'X', 'X', 'D'], // (1,2,2) BMB - Bottom-Middle-Back
  ['F', 'X', 'X', 'B', 'X', 'D']  // (2,2,2) BLB - Bottom-Left-Back
];

export default function RubikCubeExplosion() {
  const cubeAssemblyRef = useRef<HTMLDivElement>(null);
  // Default to a nice 3D angle
  const [rotate, setRotate] = useState({ x: -25, y: 45 });
  const [explode, setExplode] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Drag state reference to avoid re-renders on mouse move
  const dragState = useRef({
    dragging: false, lastX: 0, lastY: 0,
    startX: 0, startY: 0
  });

  // Effect to create the cubies once on mount
  useEffect(() => {
    const cubeAssembly = cubeAssemblyRef.current;
    if (!cubeAssembly) return;

    // Clear previous cubies if any, for hot-reloading
    cubeAssembly.innerHTML = '';
    const cubies: HTMLDivElement[] = [];
    for (let z = 0; z < 3; z++) {
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          const cubie = document.createElement('div');
          cubie.classList.add('cubie');
          cubie.dataset.x = x.toString();
          cubie.dataset.y = y.toString();
          cubie.dataset.z = z.toString();

          const initialX = (x - 1) * cubieSize;
          const initialY = (y - 1) * cubieSize;
          const initialZ = (z - 1) * cubieSize;
          cubie.style.transform = `translate3d(${initialX}px, ${initialY}px, ${initialZ}px)`;

          // The faces are created but the new CSS will style them uniformly
          const facesConfig = [
            { name: 'front' }, { name: 'back' }, { name: 'right' },
            { name: 'left' }, { name: 'top' }, { name: 'bottom' },
          ];

          facesConfig.forEach(faceConfig => {
            const face = document.createElement('div');
            face.classList.add('face', faceConfig.name);
            cubie.appendChild(face);
          });

          cubeAssembly.appendChild(cubie);
          cubies.push(cubie);
        }
      }
    }
    // Store cubies in a non-state way to access in transform effect
    (cubeAssembly as any).cubies = cubies;
  }, []);

  // Effect to apply transformations when rotate/explode state changes
  useEffect(() => {
    const cubeAssembly = cubeAssemblyRef.current;
    if (!cubeAssembly) return;
    const cubies: HTMLDivElement[] = (cubeAssembly as any).cubies || [];
    
    // Rotate the entire assembly
    cubeAssembly.style.transform = `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`;

    const maxExplodeDistance = 150;
    const currentExplodeDistance = explode * maxExplodeDistance;

    // Transform each individual cubie
    cubies.forEach(cubie => {
      const x = parseInt(cubie.dataset.x!);
      const y = parseInt(cubie.dataset.y!);
      const z = parseInt(cubie.dataset.z!);

      const dirX = (x - 1);
      const dirY = (y - 1);
      const dirZ = (z - 1);

      const offsetX = dirX * currentExplodeDistance;
      const offsetY = dirY * currentExplodeDistance;
      const offsetZ = dirZ * currentExplodeDistance;

      const initialX = (x - 1) * cubieSize;
      const initialY = (y - 1) * cubieSize;
      const initialZ = (z - 1) * cubieSize;

      const cubieRotateX = dirY * explode * 30;
      const cubieRotateY = -dirX * explode * 30;
      const cubieRotateZ = dirZ * explode * 20;

      cubie.style.transform = `
        translate3d(${initialX + offsetX}px, ${initialY + offsetY}px, ${initialZ + offsetZ}px)
        rotateX(${cubieRotateX}deg)
        rotateY(${cubieRotateY}deg)
        rotateZ(${cubieRotateZ}deg)
      `;
    });
  }, [rotate, explode]);

  // Effect to handle mouse drag events
  useEffect(() => {
    const container = cubeAssemblyRef.current?.parentElement;
    if (!container) return;

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      dragState.current = {
        dragging: true,
        lastX: e.clientX,
        lastY: e.clientY,
        startX: e.clientX,
        startY: e.clientY,
      };
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragState.current.dragging) return;
      e.preventDefault();
      const { lastX, lastY } = dragState.current;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      
      setRotate(r => ({
        x: r.x - dy * 0.5, // Adjusted sensitivity
        y: r.y + dx * 0.5,
      }));

      const dragDist = Math.sqrt(
        Math.pow(e.clientX - dragState.current.startX, 2) +
        Math.pow(e.clientY - dragState.current.startY, 2)
      );
      setExplode(Math.max(0, Math.min(1, dragDist / 250))); // Adjusted sensitivity

      dragState.current.lastX = e.clientX;
      dragState.current.lastY = e.clientY;
    };

    const onMouseUp = () => {
      if (!dragState.current.dragging) return;
      setIsDragging(false);
      dragState.current.dragging = false;

      // Animate back to the initial state using CSS transitions
      setRotate({ x: -25, y: 45 });
      setExplode(0);

      document.body.style.cursor = 'default';
      document.body.style.userSelect = '';
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="rubik-wrapper">
      <div 
        className={`rubik-container ${isDragging ? 'is-dragging' : ''}`}
        style={{ cursor: 'grab', pointerEvents: 'auto' }}
      >
        <div className="cube-assembly" ref={cubeAssemblyRef}></div>
      </div>
    </div>
  );
}