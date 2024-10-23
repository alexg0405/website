import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

const BostonView: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );

    camera.position.set(-100, 500, -200);
    camera.rotation.x = Math.PI / 3;
    camera.rotation.y = Math.PI;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0x221f2e, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 100, -200).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let object: THREE.Object3D;

    loader.load(
      "/boston.gltf",
      (gltf) => {
        object = gltf.scene;
        scene.add(object);
        console.log("Model loaded successfully");
      },
      (xhr) => {
        console.log(
          `Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
        );
      },
      (error) => {
        console.error("An error occurred while loading the model:", error);
      }
    );

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 200;
      mouseY = (event.clientY - window.innerHeight / 2) / 200;
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      if (object) {
        targetX = mouseX * 0.03;
        targetY = mouseY * 0.015;

        object.rotation.y += 0.05 * (targetX - object.rotation.y);
        object.rotation.x += 0.05 * (targetY - object.rotation.x);
      }

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);

      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default BostonView;
