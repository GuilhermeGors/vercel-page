// src/components/Planet.jsx
import * as THREE from 'three';

class Planet {
    constructor({ distance, size, color, moonCount, speed }) {
        this.distance = distance;
        this.speed = speed;
        this.angle = 0;

        // Criar o planeta
        const geometry = new THREE.SphereGeometry(size, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(distance, 0, 0);

        // Criar as luas
        this.moons = [];
        for (let i = 0; i < moonCount; i++) {
            const moonGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            const moonDistance = 0.6 + Math.random();
            moon.position.set(moonDistance, 0, 0);
            this.moons.push({ moon, angle: Math.random() * Math.PI * 2, distance: moonDistance });
            this.mesh.add(moon);
        }
    }

    update() {
        this.angle += this.speed;
        this.mesh.position.set(
            this.distance * Math.cos(this.angle),
            0,
            this.distance * Math.sin(this.angle)
        );

        this.moons.forEach(moonData => {
            moonData.angle += 0.02;
            moonData.moon.position.set(
                moonData.distance * Math.cos(moonData.angle),
                0,
                moonData.distance * Math.sin(moonData.angle)
            );
        });
    }
}

export default Planet;
