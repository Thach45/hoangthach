'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleHeadRotation,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

import { OrbitControls } from "three-stdlib";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef(new THREE.Scene());

  useEffect(() => {
    let isMounted = true;
    const currentCanvasDiv = canvasDiv.current;
    if (currentCanvasDiv) {
      const rect = currentCanvasDiv.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const aspect = width / height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      currentCanvasDiv.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.set(15, 15, 40); // Tilted to the side
      camera.lookAt(0, 5, 0);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.minDistance = 20;
      controls.maxDistance = 100;
      controls.target.set(0, 5, 0);
      
      let headBone: THREE.Object3D | null = null;
      let mixer: THREE.AnimationMixer;
      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf && isMounted) {
          const animations = setAnimations(gltf);
          mixer = animations.mixer;
          const charModel = gltf.scene;
          
          // Reset position and center
          charModel.position.set(0, 0, 0); 
          charModel.scale.set(0.6, 0.6, 0.6);
          
          scene.add(charModel);
          
          // Apply initial responsive sizing
          handleResize(renderer, camera, canvasDiv, charModel);
          
          headBone = (charModel.getObjectByName("spine006") || 
                     charModel.getObjectByName("Head") || 
                     charModel.getObjectByName("neck")) ?? null;
          
          light.turnOnLights();
          animations.startIntro();

          window.addEventListener("resize", () =>
            handleResize(renderer, camera, canvasDiv, charModel)
          );
        }
      });

      let mouse = { x: 0, y: 0 };
      const interpolation = { x: 0.1, y: 0.1 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };

      window.addEventListener("mousemove", onMouseMove);

      const animate = () => {
        if (!isMounted) return;
        requestAnimationFrame(animate);
        
        controls.update(); // Update controls for damping

        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        isMounted = false;
        window.removeEventListener("mousemove", onMouseMove);
        scene.clear();
        renderer.dispose();
        controls.dispose();
        if (currentCanvasDiv) {
          currentCanvasDiv.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full" ref={canvasDiv}></div>
      <div className="absolute inset-0 pointer-events-none"></div>
    </div>
  );
};

export default Scene;
