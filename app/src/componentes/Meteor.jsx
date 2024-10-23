// app/src/componentes/Meteor.jsx
import * as THREE from 'three';

class Meteor {
    constructor() {
        this.geometry = new THREE.SphereGeometry(0.5, 8, 8);
        this.material = new THREE.MeshStandardMaterial({ color: 0x888888 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        // Posições aleatórias
        this.resetPosition();
        this.speed = 0.02 + Math.random() * 0.1; // Velocidade aleatória
        this.direction = Math.random() * Math.PI * 2; // Direção aleatória
    }

    update() {
        this.mesh.position.x += this.speed * Math.cos(this.direction);
        this.mesh.position.y += this.speed * Math.sin(this.direction);
        this.mesh.position.z += this.speed * Math.sin(this.direction);
        
        // Se o meteoro sair do campo de visão, resetar a posição
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

export default Meteor;
