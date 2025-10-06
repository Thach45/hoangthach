'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const vertexShader = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;

  #define PI 3.14159265359

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    vec2 pos = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    
    float time = uTime * 0.5;
    
    // Create flowing effect
    float flow = sin(pos.x * 3.0 + time) * cos(pos.y * 2.0 - time) * 0.5;
    
    // Add noise pattern
    vec2 noisePos = pos * 3.0;
    noisePos.x += sin(time * 0.5);
    noisePos.y += cos(time * 0.3);
    float noisePat = noise(noisePos) * 0.3;
    
    // Combine effects
    float pattern = flow + noisePat;
    
    // Create gradient with animated pattern
    vec3 color = mix(uColor1, uColor2, pattern + 0.5);
    
    // Add glow effect
    float glow = max(1.0 - length(pos) * 0.8, 0.0);
    color += glow * 0.3;
    
    // Output final color
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface SkillsBackgroundProps {
  color1?: [number, number, number];
  color2?: [number, number, number];
}

export default function SkillsBackground({ 
  color1 = [0.22, 0.7, 0.67], // Teal color
  color2 = [0.22, 0.47, 0.67] // Blue color
}: SkillsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      depth: false,
    });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Color(gl.canvas.width, gl.canvas.height, 1) },
        uColor1: { value: new Color(...color1) },
        uColor2: { value: new Color(...color2) }
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const { innerWidth: width, innerHeight: height } = window;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = new Color(width, height, 1);
    }

    window.addEventListener('resize', resize);
    resize();

    let rafId: number;
    function update(t: number) {
      rafId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      if (containerRef.current?.contains(gl.canvas)) {
        containerRef.current.removeChild(gl.canvas);
      }
      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color1, color2]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 opacity-20"
      aria-hidden="true"
    />
  );
}