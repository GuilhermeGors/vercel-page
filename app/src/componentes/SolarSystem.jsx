import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import Planet from './Planet';
import PlanetMotion from './PlanetMotion';
import Background from './Background';

const SolarSystem = () => {
    const [hoveredPlanet, setHoveredPlanet] = useState(null);
    const sceneRef = useRef();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const planetsData = [
        { distance: 5, size: 0.5, color: 0xff0000, moonCount: 1, speed: 0.03 },
        { distance: 7, size: 0.7, color: 0x00ff00, moonCount: 2, speed: 0.02 },
        { distance: 9, size: 1.0, color: 0x0000ff, moonCount: 1, speed: 0.023 },
        { distance: 11, size: 0.6, color: 0xffff00, moonCount: 0, speed: 0.025 },
    ];

    useEffect(() => {
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 20);
        camera.lookAt(0, 0, 0);

        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 0, 0);
        scene.add(light);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x0b0c1f, 1);
        document.body.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

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

        let INTERSECTED = null; // Variável para rastrear o planeta atualmente intersecado

        const animate = () => {
            background.update();
            sun.rotation.y += 0.01;

            planets.forEach(planet => {
                if (!planet.isPaused) { // Verifica se o planeta não está pausado
                    planet.update(); // Atualiza o planeta
                }
            });

            // Configurar raycaster
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));
            
            if (intersects.length > 0) {
                const index = planets.findIndex(p => p.mesh === intersects[0].object);
                if (index !== -1) { // Verifica se o índice é válido
                    if (INTERSECTED !== index) {
                        // Restaurar a cor original do planeta anterior (se houver)
                        if (INTERSECTED !== null && INTERSECTED < planets.length) { // Verifica se INTERSECTED é válido
                            planets[INTERSECTED].mesh.material.color.setHex(planets[INTERSECTED].mesh.material.currentHex);
                            planets[INTERSECTED].isPaused = false; // Retorna o movimento do planeta
                            planets[INTERSECTED].setHighlight(false); // Ocultar a coroa
                        }
                        // Atualizar o planeta intersecado
                        INTERSECTED = index;
                        planets[INTERSECTED].mesh.material.currentHex = planets[INTERSECTED].mesh.material.color.getHex(); // Armazenar cor original
                        planets[INTERSECTED].mesh.material.color.setHex(0xffff00); // Definir nova cor
                        planets[INTERSECTED].isPaused = true; // Pausa o movimento do planeta
                        planets[INTERSECTED].setHighlight(true); // Mostrar a coroa
                    }
                }
            } else { // Se não houver intersecções
                if (INTERSECTED !== null && INTERSECTED < planets.length) { // Verifica se INTERSECTED é válido
                    planets[INTERSECTED].mesh.material.color.setHex(planets[INTERSECTED].mesh.material.currentHex);
                    planets[INTERSECTED].isPaused = false; // Retorna o movimento do planeta
                    planets[INTERSECTED].setHighlight(false); // Ocultar a coroa
                    INTERSECTED = null; // Remover referência
                }
            }

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // Listener de mouse
        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            if (renderer.domElement.parentNode) {
                document.body.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <>
            {planetsData.map((data, index) => (
                <PlanetMotion
                    key={index}
                    data={data}
                    scene={sceneRef.current}
                    isHovered={hoveredPlanet === index}
                />
            ))}
        </>
    );
};

export default SolarSystem;
