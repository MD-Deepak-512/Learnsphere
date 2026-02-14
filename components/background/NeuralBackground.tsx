'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 150 }) {
    const meshRef = useRef<THREE.Points>(null!);

    const { geometry } = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;

            colors[i3] = 0;
            colors[i3 + 1] = 0.8 + Math.random() * 0.2;
            colors[i3 + 2] = 0.3 + Math.random() * 0.2;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        return { geometry: geo };
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;
        meshRef.current.rotation.y = time * 0.02;
        meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;

        const posAttr = meshRef.current.geometry.attributes.position;
        const positions = posAttr.array as Float32Array;
        for (let i = 0; i < count; i++) {
            positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.002;
        }
        posAttr.needsUpdate = true;
    });

    const material = useMemo(() => new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    }), []);

    return <points ref={meshRef} geometry={geometry} material={material} />;
}

function GridFloor() {
    const gridRef = useRef<THREE.GridHelper>(null!);

    useFrame((state) => {
        if (!gridRef.current) return;
        gridRef.current.position.z = -(state.clock.elapsedTime * 0.3) % 2;
    });

    useEffect(() => {
        if (gridRef.current) {
            const mat = gridRef.current.material;
            if (Array.isArray(mat)) {
                mat.forEach((m) => { m.transparent = true; m.opacity = 0.04; });
            } else {
                mat.transparent = true;
                mat.opacity = 0.04;
            }
        }
    }, []);

    return (
        <gridHelper
            ref={gridRef}
            args={[40, 40, '#00FF88', '#00FF88']}
            position={[0, -5, 0]}
        />
    );
}

function NeuralLines() {
    const groupRef = useRef<THREE.Group>(null!);

    const lineObjects = useMemo(() => {
        const objects: THREE.Line[] = [];
        for (let i = 0; i < 15; i++) {
            const points: THREE.Vector3[] = [];
            const startX = (Math.random() - 0.5) * 16;
            const startY = (Math.random() - 0.5) * 10;
            const startZ = (Math.random() - 0.5) * 6;

            for (let j = 0; j < 4; j++) {
                points.push(new THREE.Vector3(
                    startX + (Math.random() - 0.5) * 4,
                    startY + (Math.random() - 0.5) * 4,
                    startZ + (Math.random() - 0.5) * 2
                ));
            }

            const curve = new THREE.CatmullRomCurve3(points);
            const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
            const mat = new THREE.LineBasicMaterial({
                color: '#00FF88',
                transparent: true,
                opacity: 0.08 + Math.random() * 0.07,
                blending: THREE.AdditiveBlending,
            });
            objects.push(new THREE.Line(geo, mat));
        }
        return objects;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {lineObjects.map((lineObj, i) => (
                <primitive key={i} object={lineObj} />
            ))}
        </group>
    );
}

export default function NeuralBackground() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
        }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.1} />
                <Particles count={150} />
                <GridFloor />
                <NeuralLines />
            </Canvas>
        </div>
    );
}
