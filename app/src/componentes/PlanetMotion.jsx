// app/src/componentes/PlanetMotion.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

const PlanetMotion = ({ data, onMouseEnter, onMouseLeave, isHovered, scene }) => {
    const planetRef = useRef();

    useEffect(() => {
        const { distance, size, color } = data;
        const geometry = new THREE.SphereGeometry(size, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color });
        const planet = new THREE.Mesh(geometry, material);
        planet.position.set(distance, 0, 0);
        
        if (scene) {
            scene.add(planet);
            planetRef.current = planet;

            // Usando addEventListener para eventos de mouse
            planet.addEventListener('mouseenter', onMouseEnter);
            planet.addEventListener('mouseleave', onMouseLeave);
        }

        return () => {
            if (planetRef.current && scene) {
                scene.remove(planetRef.current);
            }
        };
    }, [data, onMouseEnter, onMouseLeave, scene]);

    useEffect(() => {
        if (planetRef.current) {
            planetRef.current.scale.set(isHovered ? 1.2 : 1, isHovered ? 1.2 : 1, isHovered ? 1.2 : 1);
        }
    }, [isHovered]);

    return null;
};

PlanetMotion.propTypes = {
    data: PropTypes.object.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    isHovered: PropTypes.bool.isRequired,
    scene: PropTypes.object,
};

export default PlanetMotion;
