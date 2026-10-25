import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HumanoidProps {
  progressRef: React.MutableRefObject<number>;
  reduced: boolean;
}

/**
 * A stylized, low-poly humanoid silhouette — not a portrait of a real person.
 * Animates a "reach into pocket → produce phone" beat driven by scroll
 * progress (0..1):
 *   0.00–0.35  idle, breathing
 *   0.35–0.60  right hand reaches to hip pocket
 *   0.60–0.80  hand lifts, phone materializes
 *   0.80–1.00  phone presented toward camera
 *
 * The rig is intentionally simple and model-agnostic: a real rigged GLB can
 * replace this mesh later and reuse the same progress-driven animation
 * timeline.
 */
export function Humanoid({ progressRef, reduced }: HumanoidProps) {
  const root = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const rightHand = useRef<THREE.Group>(null);
  const phone = useRef<THREE.Group>(null);
  const phoneMat = useRef<THREE.MeshStandardMaterial>(null);

  // Reusable materials
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a28',
        roughness: 0.55,
        metalness: 0.2,
      }),
    []
  );
  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2a2230',
        roughness: 0.4,
        metalness: 0.35,
        emissive: '#f9621a',
        emissiveIntensity: 0.06,
      }),
    []
  );

  useFrame((state) => {
    const p = progressRef.current;
    const t = state.clock.elapsedTime;

    if (root.current) {
      // Gentle breathing + slight camera-follow sway.
      const breathe = reduced ? 0 : Math.sin(t * 1.2) * 0.012;
      root.current.position.y = breathe;
      root.current.rotation.y = THREE.MathUtils.lerp(
        -0.04,
        0.08,
        Math.sin(t * 0.3) * 0.5 + 0.5
      );
      // Whole figure drifts back slightly as camera pushes in.
      root.current.position.z = THREE.MathUtils.lerp(0, -0.4, p);
    }

    // Right arm reach timeline.
    if (rightArm.current) {
      // 0.35–0.60: rotate arm down toward hip pocket.
      const reach = smoothstep(0.35, 0.6, p);
      // 0.60–0.80: lift arm up to present phone.
      const lift = smoothstep(0.6, 0.85, p);
      // Combined rotation: down then up-forward.
      rightArm.current.rotation.x = THREE.MathUtils.lerp(0, 0.55, reach) +
        THREE.MathUtils.lerp(0, -1.3, lift);
      rightArm.current.rotation.z = THREE.MathUtils.lerp(0, -0.18, reach) +
        THREE.MathUtils.lerp(0, 0.25, lift);
    }

    if (rightHand.current) {
      // Forearm/hand tilts to orient the phone toward camera near the end.
      const present = smoothstep(0.7, 1, p);
      rightHand.current.rotation.x = THREE.MathUtils.lerp(0, -0.4, present);
    }

    if (phone.current) {
      // Phone scales in between 0.60 and 0.80, then grows toward camera.
      const appear = smoothstep(0.6, 0.8, p);
      const grow = smoothstep(0.8, 1, p);
      const s = appear * (1 + grow * 1.6);
      phone.current.scale.setScalar(s);
      phone.current.visible = appear > 0.01;
      // Tilt phone to face camera.
      phone.current.rotation.x = THREE.MathUtils.lerp(-0.4, -0.1, grow);
      phone.current.rotation.z = THREE.MathUtils.lerp(0.1, 0, grow);
    }

    if (phoneMat.current) {
      // Screen glow intensifies as phone is presented.
      const glow = smoothstep(0.65, 1, p);
      phoneMat.current.emissiveIntensity = 0.25 + glow * 1.6;
    }
  });

  return (
    <group ref={root} position={[0, -1.6, 0]} dispose={null}>
      {/* Head */}
      <mesh material={bodyMat} position={[0, 2.5, 0]} castShadow>
        <sphereGeometry args={[0.42, 32, 32]} />
      </mesh>
      {/* Hair cap */}
      <mesh material={accentMat} position={[0, 2.62, -0.04]} castShadow>
        <sphereGeometry args={[0.44, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
      </mesh>

      {/* Neck */}
      <mesh material={bodyMat} position={[0, 2.08, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.16, 0.22, 16]} />
      </mesh>

      {/* Torso (jacket) */}
      <mesh material={bodyMat} position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[1.05, 1.5, 0.55]} />
      </mesh>
      {/* Jacket inner accent (zipper line) */}
      <mesh material={accentMat} position={[0, 1.25, 0.28]}>
        <boxGeometry args={[0.06, 1.4, 0.02]} />
      </mesh>
      {/* Shoulder caps */}
      <mesh material={accentMat} position={[-0.58, 1.92, 0]} castShadow>
        <sphereGeometry args={[0.22, 20, 20]} />
      </mesh>
      <mesh material={accentMat} position={[0.58, 1.92, 0]} castShadow>
        <sphereGeometry args={[0.22, 20, 20]} />
      </mesh>

      {/* Left arm (static, at side) */}
      <group position={[-0.62, 1.78, 0]}>
        <mesh material={bodyMat} position={[0, -0.6, 0]} castShadow>
          <capsuleGeometry args={[0.16, 1.05, 8, 16]} />
        </mesh>
        <mesh material={accentMat} position={[0, -1.25, 0]} castShadow>
          <sphereGeometry args={[0.17, 16, 16]} />
        </mesh>
      </group>

      {/* Right arm (animated) — pivots from shoulder */}
      <group ref={rightArm} position={[0.62, 1.78, 0]}>
        <mesh material={bodyMat} position={[0, -0.6, 0]} castShadow>
          <capsuleGeometry args={[0.16, 1.05, 8, 16]} />
        </mesh>
        {/* Hand group (forearm + palm + phone) */}
        <group ref={rightHand} position={[0, -1.25, 0]}>
          <mesh material={accentMat} castShadow>
            <sphereGeometry args={[0.17, 16, 16]} />
          </mesh>
          {/* Phone held in hand, screen facing -Z (toward camera at start) */}
          <group ref={phone} position={[0, 0, 0.18]} visible={false}>
            <mesh castShadow>
              <boxGeometry args={[0.28, 0.56, 0.03]} />
              <meshStandardMaterial
                ref={phoneMat}
                color="#0a0a0f"
                roughness={0.25}
                metalness={0.6}
                emissive="#ff7d3c"
                emissiveIntensity={0.25}
              />
            </mesh>
            {/* Screen overlay */}
            <mesh position={[0, 0, 0.017]}>
              <planeGeometry args={[0.24, 0.5]} />
              <meshBasicMaterial color="#1a1020" />
            </mesh>
            {/* Glowing app icon row hint */}
            <mesh position={[0, 0.12, 0.019]}>
              <planeGeometry args={[0.18, 0.08]} />
              <meshBasicMaterial color="#f9621a" />
            </mesh>
          </group>
        </group>
      </group>

      {/* Hips */}
      <mesh material={bodyMat} position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.95, 0.45, 0.5]} />
      </mesh>
      {/* Belt accent + pocket hints */}
      <mesh material={accentMat} position={[0, 0.66, 0.26]}>
        <boxGeometry args={[0.9, 0.05, 0.02]} />
      </mesh>
      <mesh material={accentMat} position={[0.34, 0.45, 0.24]}>
        <boxGeometry args={[0.18, 0.22, 0.02]} />
      </mesh>

      {/* Legs */}
      <mesh material={bodyMat} position={[-0.26, -0.35, 0]} castShadow>
        <capsuleGeometry args={[0.2, 1.1, 8, 16]} />
      </mesh>
      <mesh material={bodyMat} position={[0.26, -0.35, 0]} castShadow>
        <capsuleGeometry args={[0.2, 1.1, 8, 16]} />
      </mesh>
      {/* Shoes */}
      <mesh material={accentMat} position={[-0.26, -1.0, 0.08]} castShadow>
        <boxGeometry args={[0.26, 0.14, 0.5]} />
      </mesh>
      <mesh material={accentMat} position={[0.26, -1.0, 0.08]} castShadow>
        <boxGeometry args={[0.26, 0.14, 0.5]} />
      </mesh>
    </group>
  );
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
