// app/src/componentes/Background.jsx
import * as THREE from 'three';
import Meteor from './Meteor';
import Spaceship from './Spaceship';

class Background {
    constructor() {
        this.starsGeometry = new THREE.BufferGeometry();
        this.starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

        const starsVertices = [];
        for (let i = 0; i < 20000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starsVertices.push(x, y, z);
        }

        this.starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        this.stars = new THREE.Points(this.starsGeometry, this.starsMaterial);

        // Adicionando meteoros
        this.meteors = [];
        for (let i = 0; i < 50000; i++) {
            const meteor = new Meteor();
            this.meteors.push(meteor);
            this.stars.add(meteor.mesh); // Adiciona cada meteoro ao cenário
        }

        // Adicionando naves
        this.spaceships = [];
        for (let i = 0; i < 10000; i++) {
            const spaceship = new Spaceship();
            this.spaceships.push(spaceship);
            this.stars.add(spaceship.mesh); // Adiciona cada nave ao cenário
        }
    }

    addToScene(scene) {
        scene.add(this.stars);
    }

    update() {
        this.meteors.forEach(meteor => meteor.update());
        this.spaceships.forEach(spaceship => spaceship.update());
    }
}

export default Background;
