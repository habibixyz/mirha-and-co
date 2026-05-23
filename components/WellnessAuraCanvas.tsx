"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function WellnessAuraCanvas() {
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

    // --- SCENE & CAMERA ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    // --- RENDERER ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // --- SHADERS ---
    // Simplex 3D noise displacement shader
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;

      // Description : Array and textureless GLSL 2D/3D/4D simplex 
      //               noise functions.
      //      Author : Ian McEwan, Ashima Arts.
      //  Maintainer : ijm
      //     Lastmod : 20110822 (ijm)
      //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
      //               Distributed under the MIT License. See LICENSE file.
      //               https://github.com/ashima/webgl-noise

      vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 permute(vec4 x) {
        return mod289(((x*34.0)+1.0)*x);
      }

      vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
      }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        // First corner
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 =   v - i + dot(i, C.xxx) ;

        // Other corners
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );

        //   x0 = x0 - 0.0 + 0.0 * C.xxx;
        //   x1 = x0 - i1  + 1.0 * C.xxx;
        //   x2 = x0 - i2  + 2.0 * C.xxx;
        //   x3 = x0 - 1.0 + 3.0 * C.xxx;
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.xxx = C.yyy
        vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.xxx = -0.5 = -D.yyy

        // Permutations
        i = mod289(i);
        vec4 p = permute( permute( permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        // Gradients: 7x7 points over a square, mapped onto an octahedron.
        // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
        float n_ = 0.142857142857; // 1.0/7.0
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );

        //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
        //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        //Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        // Mix final noise value
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                      dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        vNormal = normal;
        vUv = uv;
        vPosition = position;
        
        // Dynamic organic displacement
        float noise = snoise(position * 1.3 + uTime * 0.3);
        
        // Mouse interact displacement
        float dist = distance(position.xy, uMouse * 1.8);
        float mouseInfluence = smoothstep(2.5, 0.0, dist) * 0.35;
        
        vec3 displacedPosition = position + normal * (noise * 0.28 + mouseInfluence);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;

      void main() {
        vec3 normal = normalize(vNormal);
        
        // Fresnel/rim lighting
        vec3 viewDirection = normalize(vec3(0.0, 0.0, 1.0));
        float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 3.0);
        
        // Premium brand color palette
        vec3 sand = vec3(0.96, 0.93, 0.90);        // #f5eee6
        vec3 roseGold = vec3(0.85, 0.60, 0.56);    // #d99a8f
        vec3 champagne = vec3(0.91, 0.83, 0.71);   // #e8d3b5
        vec3 goldAura = vec3(0.78, 0.68, 0.60);    // #c8ae99
        
        // Blend base colors based on dynamic position and time
        float blend1 = sin(vPosition.x * 1.5 + uTime * 0.35) * 0.5 + 0.5;
        float blend2 = cos(vPosition.y * 1.5 - uTime * 0.25) * 0.5 + 0.5;
        
        vec3 baseColor = mix(sand, roseGold, blend1);
        baseColor = mix(baseColor, champagne, blend2);
        
        // Incorporate glowing fresnel border highlight
        vec3 finalColor = mix(baseColor, goldAura, fresnel * 0.75);
        
        // Add metallic highlight sheen
        float spec = pow(max(dot(normal, normalize(vec3(1.0, 1.0, 1.2))), 0.0), 28.0);
        finalColor += vec3(spec * 0.22);
        
        gl_FragColor = vec4(finalColor, 0.9);
      }
    `;

    // --- MESH CREATION ---
    const geometry = new THREE.IcosahedronGeometry(1.8, 64);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const blobMesh = new THREE.Mesh(geometry, material);
    scene.add(blobMesh);

    // --- PARTICLES (AURA DUST) ---
    const particlesCount = 45;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Scatter in a cube around center
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 4;
      speeds[i / 3] = Math.random() * 0.005 + 0.002;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    // Tiny circular canvas texture for soft particles
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(217, 154, 143, 0.8)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // --- INTERACTIVE MOUSE BIND ---
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

      // Uniform updates
      uniforms.uTime.value = elapsedTime;
      
      // Interpolate mouse movement for smooth damping
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;
      uniforms.uMouse.value.copy(mouse);

      // Rotate mesh slowly
      blobMesh.rotation.y = elapsedTime * 0.08;
      blobMesh.rotation.x = elapsedTime * 0.05;

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

    // --- WINDOW RESIZE BIND ---
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
      geometry.dispose();
      material.dispose();
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
