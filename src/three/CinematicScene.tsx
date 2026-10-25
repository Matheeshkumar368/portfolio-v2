import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Humanoid } from './Humanoid';

interface CinematicSceneProps {
  progressRef: React.MutableRefObject<number>;
  reduced: boolean;
}

/** Camera rig: slow push-in + slight orbit driven by scroll progress. */
function CameraRig({ progressRef, reduced }: CinematicSceneProps) {
  useFrame((state) => {
    const p = progressRef.current;
    const t = state.clock.elapsedTime;
    // Start at z=5.2, push in to z=3.4 as user scrolls.
    const z = THREE.MathUtils.lerp(5.2, 3.4, p);
    const x = THREE.MathUtils.lerp(-1.4, 0.2, p) + (reduced ? 0 : Math.sin(t * 0.15) * 0.12);
    const y = 0.6 + (reduced ? 0 : Math.sin(t * 0.2) * 0.06);
    state.camera.position.lerp(new THREE.Vector3(x, y, z), 0.06);
    state.camera.lookAt(0, 0.9, 0);
  });
  return null;
}

export function CinematicScene({ progressRef, reduced }: CinematicSceneProps) {
  const keyLight = useRef<THREE.DirectionalLight>(null);

  const fogColor = useMemo(() => new THREE.Color('#070710'), []);

  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ position: [-1.4, 0.6, 5.2], fov: 42, near: 0.1, far: 50 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog(fogColor, 6, 16);
        scene.background = fogColor;
      }}
    >
      <CameraRig progressRef={progressRef} reduced={reduced} />

      {/* Cinematic three-point lighting */}
      <ambientLight intensity={0.12} color="#3a3a4e" />
      {/* Key light — warm orange from upper left */}
      <directionalLight
        ref={keyLight}
        position={[-4, 6, 3]}
        intensity={2.4}
        color="#ff8c4a"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      {/* Rim light — cooler, behind right, separates figure from bg */}
      <spotLight
        position={[4, 4, -3]}
        angle={0.5}
        penumbra={1}
        intensity={6}
        color="#4db5e8"
        distance={20}
      />
      {/* Fill — soft, low, front-right */}
      <pointLight position={[3, -1, 4]} intensity={0.6} color="#f9621a" distance={12} />

      <Humanoid progressRef={progressRef} reduced={reduced} />

      {/* Ground contact shadow */}
      <ContactShadows
        position={[0, -2.0, 0]}
        opacity={0.7}
        scale={10}
        blur={2.6}
        far={4}
        color="#000000"
      />

      {/* Subtle reflective floor plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#0a0a0f"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      <Environment preset="night" environmentIntensity={0.25} />

      <EffectComposer>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
