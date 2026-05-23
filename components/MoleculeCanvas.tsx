"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function MoleculeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // --- SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xd99a8f, 1.5); // Warm Rose
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe8d3b5, 1.0); // Gold Champagne
    dirLight2.position.set(-5, -3, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // --- MOLECULE STRUCTURE ---
    const group = new THREE.Group();
    // Shift group up and right to prevent text overlap in the bottom-left of the banner
    group.position.set(0.7, 0.9, 0);
    scene.add(group);

    // Common premium materials
    const atomMaterialCenter = new THREE.MeshPhysicalMaterial({
      color: 0xa27b5c, // Rose Gold / Brown
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.7, // Glossy crystal/glass look
      thickness: 0.8,
      ior: 1.5,
    });

    const atomMaterialOuter = new THREE.MeshPhysicalMaterial({
      color: 0xd99a8f, // Warm Rose pink
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.8, // Translucent glass
      thickness: 0.6,
      ior: 1.4,
    });

    const bondMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8ded6,
      roughness: 0.2,
      metalness: 0.8, // Metallic bonds
      transparent: true,
      opacity: 0.8,
    });

    const sphereGeomLarge = new THREE.IcosahedronGeometry(0.5, 4);
    const sphereGeomSmall = new THREE.IcosahedronGeometry(0.24, 4);

    // 1. Atoms Coordinates (branched organic chain)
    const atoms = [
      { pos: new THREE.Vector3(0, 0, 0), isLarge: true }, // 0: Center
      { pos: new THREE.Vector3(-1.1, 0.7, -0.2), isLarge: false }, // 1: Upper Left
      { pos: new THREE.Vector3(1.1, 0.7, 0.2), isLarge: false }, // 2: Upper Right
      { pos: new THREE.Vector3(0, -1.1, 0), isLarge: false }, // 3: Bottom Center
      { pos: new THREE.Vector3(-1.8, 0.1, 0.4), isLarge: false }, // 4: Far Left
      { pos: new THREE.Vector3(1.8, 0.1, -0.4), isLarge: false }, // 5: Far Right
      { pos: new THREE.Vector3(-0.7, -1.8, -0.3), isLarge: false }, // 6: Bottom Left
      { pos: new THREE.Vector3(0.7, -1.8, 0.3), isLarge: false }, // 7: Bottom Right
    ];

    atoms.forEach((atom) => {
      const mesh = new THREE.Mesh(
        atom.isLarge ? sphereGeomLarge : sphereGeomSmall,
        atom.isLarge ? atomMaterialCenter : atomMaterialOuter
      );
      mesh.position.copy(atom.pos);
      group.add(mesh);
    });

    // Helper to draw a bond (cylinder) between two vectors
    const createBond = (v1: THREE.Vector3, v2: THREE.Vector3) => {
      const distance = v1.distanceTo(v2);
      // Thin bond cylinder lines from 0.06 to 0.03 for a delicate architectural visual
      const cylinderGeom = new THREE.CylinderGeometry(0.03, 0.03, distance, 16);
      const cylinder = new THREE.Mesh(cylinderGeom, bondMaterial);

      // Position in middle of the two atoms
      const position = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
      cylinder.position.copy(position);

      // Rotate cylinder to point from v1 to v2
      const direction = new THREE.Vector3().subVectors(v2, v1).normalize();
      const alignAxis = new THREE.Vector3(0, 1, 0); // Cylinders are aligned along Y axis by default
      const quaternion = new THREE.Quaternion().setFromUnitVectors(alignAxis, direction);
      cylinder.setRotationFromQuaternion(quaternion);

      group.add(cylinder);
    };

    // 2. Connect Bonds
    createBond(atoms[0].pos, atoms[1].pos);
    createBond(atoms[0].pos, atoms[2].pos);
    createBond(atoms[0].pos, atoms[3].pos);
    createBond(atoms[1].pos, atoms[4].pos);
    createBond(atoms[2].pos, atoms[5].pos);
    createBond(atoms[3].pos, atoms[6].pos);
    createBond(atoms[3].pos, atoms[7].pos);

    // --- FLOATING PARTICLES (AURA DUST) ---
    const particlesCount = 30;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 4;
      speeds[i / 3] = Math.random() * 0.003 + 0.0015;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle texture
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(217, 154, 143, 0.7)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.14,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // --- INTERACTIVE MOUSE ROTATION ---
    const mouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetMouse.set(x, y);
    };

    container.addEventListener("mousemove", handleMouseMove);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Damped mouse follow
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Slowly rotate group and tilt according to mouse coordinates
      group.rotation.y = elapsedTime * 0.12 + mouse.x * 0.35;
      group.rotation.x = elapsedTime * 0.06 - mouse.y * 0.35;

      // Soft vertical floating bounce keeping the shifted Y position (0.9)
      group.position.y = 0.9 + Math.sin(elapsedTime * 0.5) * 0.12;

      // Animate background particles (float upwards)
      const positionsArray = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const indexY = i * 3 + 1;
        positionsArray[indexY] += speeds[i];

        // Wrap around if particle goes above screen
        if (positionsArray[indexY] > 3) {
          positionsArray[indexY] = -3;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // --- RESIZE BIND ---
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      sphereGeomLarge.dispose();
      sphereGeomSmall.dispose();
      atomMaterialCenter.dispose();
      atomMaterialOuter.dispose();
      bondMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      particleTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mounted]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
}
