import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

const setLighting = (scene: THREE.Scene) => {
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load("/models/char_enviorment.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const turnOnLights = () => {
    // Smooth transition or logic to turn on lights
    gsap.to(directionalLight, { intensity: 1.5, duration: 2 });
  };

  const setPointLight = (target: THREE.Object3D | null) => {
    if (target) {
      // Logic for dynamic point light if needed
    }
  };

  return { turnOnLights, setPointLight };
};

import gsap from "gsap";
export default setLighting;
