// app/src/componentes/Spaceship.jsx
import * as THREE from 'three';

class Spaceship {
    constructor() {
        this.geometry = new THREE.ConeGeometry(0.2, 0.5, 8);
        this.material = new THREE.MeshStandardMaterial({ color: 0xff00ff });
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        // Posições aleatórias
        this.resetPosition();
        this.speed = 0.01 + Math.random() * 0.02; // Velocidade aleatória
        this.direction = Math.random() * Math.PI * 2; // Direção aleatória
    }

    update() {
        this.mesh.position.x += this.speed * Math.cos(this.direction);
        this.mesh.position.y += this.speed * Math.sin(this.direction);
        this.mesh.position.z += this.speed * Math.sin(this.direction);
        
        // Se a nave sair do campo de visão, resetar a posição
        if (Math.abs(this.mesh.position.x) > 1000 || Math.abs(this.mesh.position.y) > 1000 || Math.abs(this.mesh.position.z) > 1000) {
            this.resetPosition();
        }
    }

    resetPosition() {
        this.mesh.position.set(
            (Math.random() - 0.5) * 2000,
            (Math.random() - 0.5) * 2000,
            (Math.random() - 0.5) * 2000
        );
    }
}

export default Spaceship;
