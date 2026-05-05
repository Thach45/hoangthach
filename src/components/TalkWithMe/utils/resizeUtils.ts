import * as THREE from "three";

const handleResize = (
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character?: THREE.Object3D
) => {
  if (canvasDiv.current) {
    const { width, height } = canvasDiv.current.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    // Adjust character position or scale based on screen size if needed
    if (character) {
      if (width < 768) {
        character.scale.set(0.4, 0.4, 0.4); // Smaller on mobile
        character.position.y = -1; // Center it a bit lower
        camera.position.set(10, 10, 45); // Pull camera back a bit
      } else {
        character.scale.set(0.6, 0.6, 0.6); // Original desktop scale
        character.position.y = 0;
        camera.position.set(15, 15, 40);
      }
    }
  }
};

export default handleResize;
