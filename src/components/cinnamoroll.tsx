'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Cinnamoroll = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
      });

      const camera = new THREE.PerspectiveCamera(30, 1);
      camera.position.set(0, 0, 20);

      scene.background = new THREE.Color('#ffffff');
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(5, 5, 5);
      scene.add(light);

      const loader = new GLTFLoader();
      loader.load('/cinnamoroll/scene.gltf', (gltf: GLTF) => {
        scene.add(gltf.scene);

        const animate = () => {
          requestAnimationFrame(animate);
          gltf.scene.rotation.y += 0.01;
          renderer.render(scene, camera);
        };
        animate();
      });
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} id='canvas' width='300px' height='200px' />;
};

export default Cinnamoroll;
