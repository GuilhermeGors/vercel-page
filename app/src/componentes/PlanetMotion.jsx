import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

const PlanetMotion = ({ data, isHovered, scene }) => {
    const planetRef = useRef();
    const edgeRef = useRef();

    useEffect(() => {
        const { distance, size, color } = data;

        const geometry = new THREE.SphereGeometry(size, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color });
        const planet = new THREE.Mesh(geometry, material);
        planet.position.set(distance, 0, 0);
        planetRef.current = planet;

        if (scene) {
            scene.add(planet);
        }

        // Criar a borda do planeta
        const edges = new THREE.EdgesGeometry(geometry);
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
        edgeRef.current = edgeLines;

        return () => {
            if (planetRef.current && scene) {
                scene.remove(planetRef.current);
            }
        };
    }, [data, scene]);

    // Atualiza a borda quando em hover
    useEffect(() => {
        if (planetRef.current) {
            if (isHovered) {
                if (!edgeRef.current.parent) {
                    // Adiciona a borda ao planeta
                    planetRef.current.add(edgeRef.current);
                }
            } else if (edgeRef.current && edgeRef.current.parent) {
                // Remove a borda se não estiver mais em hover
                planetRef.current.remove(edgeRef.current);
            }
        }
    }, [isHovered]);

    // Atualiza a posição da borda para acompanhar o planeta
    useEffect(() => {
        const updateEdgePosition = () => {
            if (edgeRef.current && planetRef.current) {
                // Atualiza a posição da borda para coincidir com a do planeta
                edgeRef.current.position.copy(planetRef.current.position);
            }
        };

        // Atualiza a posição da borda durante a animação
        const animationFrame = () => {
            updateEdgePosition();
            requestAnimationFrame(animationFrame);
        };

        requestAnimationFrame(animationFrame);

        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return null;
};

PlanetMotion.propTypes = {
    data: PropTypes.object.isRequired,
    isHovered: PropTypes.bool.isRequired,
    scene: PropTypes.object,
};

export default PlanetMotion;
