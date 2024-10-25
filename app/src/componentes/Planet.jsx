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

        // Criar a coroa de destaque
        this.highlightGeometry = new THREE.RingGeometry(size * 1.2, size * 1.5, 32);
        const highlightMaterial = new THREE.MeshStandardMaterial({
            color: 0xffff00,
            opacity: 0.5,
            transparent: true,
            emissive: 0xffff00,
            side: THREE.DoubleSide
        });
        this.highlight = new THREE.Mesh(this.highlightGeometry, highlightMaterial);
        this.highlight.rotation.x = Math.PI / 2; // Girar para ficar em posição horizontal
        this.highlight.visible = false; // Começar invisível
        this.mesh.add(this.highlight); // Adicionar a coroa ao planeta

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

    // Método para mostrar/ocultar a coroa
    setHighlight(visible) {
        this.highlight.visible = visible;
    }
}

export default Planet;
