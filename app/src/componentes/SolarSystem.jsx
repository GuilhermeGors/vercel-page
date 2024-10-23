// app/src/componentes/SolarSystem.jsx
import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import Planet from './Planet';
import PlanetMotion from './PlanetMotion';
import Background from './Background';

const SolarSystem = () => {
    const [hoveredPlanet, setHoveredPlanet] = useState(null);
    const [animationPaused, setAnimationPaused] = useState(false);
    const sceneRef = useRef();

    const planetsData = [
        { distance: 5, size: 0.5, color: 0xff0000, moonCount: 1, speed: 0.03 },
        { distance: 7, size: 0.7, color: 0x00ff00, moonCount: 2, speed: 0.02 },
        { distance: 9, size: 1.0, color: 0x0000ff, moonCount: 1, speed: 0.023 },
        { distance: 11, size: 0.6, color: 0xffff00, moonCount: 0, speed: 0.025 },
    ];

    useEffect(() => {
        // Criando a cena
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 20);
        camera.lookAt(0, 0, 0);

        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 0, 0); // Posicione onde achar melhor
        scene.add(light);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x0b0c1f, 1);
        document.body.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 10, 7.5).normalize();
        scene.add(directionalLight);

        // Criando e adicionando o fundo
        const background = new Background();
        background.addToScene(scene);

        const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
        const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        const planets = planetsData.map(data => {
            const planet = new Planet(data);
            scene.add(planet.mesh);
            return planet;
        });

        const animate = () => {
            background.update(); // Atualiza meteoros e naves

            if (!animationPaused) {
                sun.rotation.y += 0.01;
                planets.forEach(planet => planet.update());
            }
    
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            // Limpar a cena ao desmontar o componente
            if (renderer.domElement.parentNode) {
                document.body.removeChild(renderer.domElement);
            }
        };
    }, [animationPaused]);

    return (
        <>
            {planetsData.map((data, index) => (
                <PlanetMotion
                    key={index}
                    data={data}
                    scene={sceneRef.current}
                    onMouseEnter={() => {
                        setHoveredPlanet(index);
                        setAnimationPaused(true);
                    }}
                    onMouseLeave={() => {
                        setHoveredPlanet(null);
                        setAnimationPaused(false);
                    }}
                    isHovered={hoveredPlanet === index}
                />
            ))}
        </>
    );
};

export default SolarSystem;
