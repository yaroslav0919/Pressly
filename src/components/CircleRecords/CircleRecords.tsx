import { useEffect, useRef, useState, useMemo } from 'react';
import React, { Fragment } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';

// For Debug Controls
import { useControls } from 'leva';

function CircleRecords() {
  // Create a circle of radius 10 to place the records on
  const circleRadius = 1.99;
  const circleCenter = new THREE.Vector3(0, 0, 0);
  const recordPositions = [];
  const numRecords = 5;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  for (let i = 0; i < numRecords; i++) {
    const angle = (i / numRecords) * Math.PI * 2;
    const x = circleCenter.x + circleRadius * Math.cos(angle);
    const z = circleCenter.x + circleRadius * Math.sin(angle);
    const position = new THREE.Vector3(x, z, -2);
    recordPositions.push(position);
  }

  const groupRef = useRef<THREE.Group>(null);

  const position = {
    x: -2.4,
    y: 0,
    z: ((windowWidth < 720 ? 0.8 : 0.7) * 1280) / windowWidth,
  };
  const { camera } = useThree();
  camera.position.set(position.x, position.y, position.z);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    function onMouseMove(e: any) {
      e.preventDefault();
      const xOff = e.clientX / window.innerWidth;
      const yOff = e.clientY / window.innerHeight;

      // camera.position.x = -2.4 + xOff * 0.2;
      // camera.position.y = yOff * 0.2;

      camera.rotation.x = -yOff * 0.1;
      camera.rotation.y = -xOff * 0.1;
    }
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.addEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Enable Controls for Lights
  const options1 = {
    x: { value: 0, min: -20, max: 30, step: 0.01 },
    y: { value: 3, min: -20, max: 30, step: 0.01 },
    z: { value: 30, min: -20, max: 30, step: 0.01 },
    visible: true,
    color: { value: '#444444' },
  };
  const options2 = useMemo(() => {
    return {
      x: { value: 0, min: -20, max: 30, step: 0.01 },
      y: { value: 2, min: -20, max: 30, step: 0.01 },
      z: { value: 31, min: -20, max: 30, step: 0.01 },
      visible: true,
      color: { value: '#444444' },
    };
  }, []);
  const options3 = useMemo(() => {
    return {
      x: { value: 0, min: -20, max: 30, step: 0.01 },
      y: { value: -2, min: -20, max: 30, step: 0.01 },
      z: { value: 30.9, min: -20, max: 30, step: 0.01 },
      visible: true,
      color: { value: '#ffffff' },
    };
  }, []);
  const options4 = useMemo(() => {
    return {
      x: { value: -1, min: -20, max: 30, step: 0.01 },
      y: { value: 5, min: -20, max: 30, step: 0.01 },
      z: { value: 32.8, min: -20, max: 30, step: 0.01 },
      visible: true,
      color: { value: '#222222' },
    };
  }, []);
  const options5 = useMemo(() => {
    return {
      x: { value: -3, min: -20, max: 30, step: 0.01 },
      y: { value: -10, min: -20, max: 30, step: 0.01 },
      z: { value: 30, min: -20, max: 30, step: 0.01 },
      visible: true,
      color: { value: '#001122' },
    };
  }, []);

  const pL1 = useControls('Point Light 1', options1);
  const pL2 = useControls('Point Light 2', options2);
  const pL3 = useControls('Point Light 3', options3);
  const pL4 = useControls('Point Light 4', options4);
  const pL5 = useControls('Point Light 5', options5);

  const colors = [
    'rgb(0, 255, 255)', // red
    'rgb(255,200,80)', // yellow
    'rgb(120,80,255)', // magenta
    'rgb(192, 221, 195)', // light green
    'rgb(0,200,255)', // cyan
    'rgb(0, 200, 100)', // green
    'rgb(255,255,255)', // white

    // Add more colors as needed
  ];

  function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    const rotationSpeed = 0.003;
    group.rotation.z += 0.0005;
    for (let i = 0; i < numRecords * 2; i++) {
      const record = group.children[i];
      record.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), rotationSpeed);
      record.rotation.z += 0.015;
    }
  });

  // Load the texture for the vinyl records
  const [texture, labelOnlyTexture] = useLoader(
    TextureLoader,
    ['/static/images/labelandedge.png', '/static/images/labelonly.png'],
    undefined,
    (progress) => {
      console.log(progress);
    }
  );

  return (
    <>
      <ambientLight intensity={5.2} color='#ffffff' />
      {/* Create the vinyl records and add them to the scene */}
      <group ref={groupRef}>
        {recordPositions.map((position, i) => {
          const updatedPosition = position;
          const labelPosition = new THREE.Vector3(
            updatedPosition.x,
            updatedPosition.y,
            updatedPosition.z + 0.0048
          );
          const rotation = Math.random() * 0.5;

          return (
            <React.Fragment key={`${i}`}>
              <mesh key={`mesh-${i}`} position={position} rotation-y={rotation}>
                <circleGeometry args={[1, 64]} />
                <meshPhysicalMaterial
                  attach='material'
                  // Change color to array of colors instead:
                  color={colors[i]}
                  roughness={0.1}
                  metalness={1.15}
                  map={texture}
                />
              </mesh>
              <mesh
                key={`label-${i}`}
                position={labelPosition}
                rotation-y={rotation}>
                <circleGeometry args={[0.32, 32]} />
                <meshPhysicalMaterial
                  attach='material'
                  roughness={0.1}
                  metalness={1.035}
                  map={labelOnlyTexture}
                  //normalScale={new THREE.Vector2(1, 1)}
                />
              </mesh>
            </React.Fragment>
          );
        })}
      </group>
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.7} height={300} />
        {/* <Noise opacity={0.05} /> */}
        {/* <Vignette eskil={false} offset={0.1} darkness={1.2} /> */}
      </EffectComposer>
    </>
  );
}

export default CircleRecords;
