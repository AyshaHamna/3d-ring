import { DragControls, Environment, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { lazy, Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Mesh } from "three";

const Model = lazy(() => import("./Model"));
const DiamondModel = lazy(() => import("./DiamondModel"));
const PurpleDiamond = lazy(() => import("./PurpleDiamond"));

const Loading: React.FC = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <Text fontSize={1} color="black" anchorX="center" anchorY="middle">
        Loading...
      </Text>
    </mesh>
  );
};

const DragnDrop: React.FC = () => {
  const diamondRef = useRef<Mesh>(null);
  const purpleDiamondRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  const [selectedStone, setSelectedStone] = useState<string>("");

  // Store the original positions of the diamonds
  const originalPositions = {
    // diamond: [2, -1, 3] as [number, number, number],
    // purpleDiamond: [2, -1.4, 2.3] as [number, number, number],
    diamond: [1, 0, 0] as [number, number, number],
    purpleDiamond: [1, 0, 0] as [number, number, number],
  };

  // Handle drag end for diamond
  const onDiamondDragEnd = () => {
    if (ringRef.current && diamondRef.current) {
      const ringBoundingBox = new THREE.Box3().setFromObject(ringRef.current);
      const diamondBoundingBox = new THREE.Box3().setFromObject(diamondRef.current);

      if (ringBoundingBox.intersectsBox(diamondBoundingBox)) {
        console.log("Diamond near the ring");
        if (selectedStone === "purpleDiamond") {
            // Reset purple diamond position if it was previously placed
            purpleDiamondRef.current?.position.set(...originalPositions.purpleDiamond);
          }
        diamondRef.current.position.set(-1.45, -0.35, 1.3);
        console.log("prev selected stone ", selectedStone);
        setSelectedStone("diamond");
        console.log("selected stone ", selectedStone);
      } else {
        // Reset position if not near the ring
        diamondRef.current.position.set(...originalPositions.diamond);
      }
    }
  };

  // Handle drag end for purple diamond
  const onPurpleDiamondDragEnd = () => {
    if (ringRef.current && purpleDiamondRef.current) {
      const ringBoundingBox = new THREE.Box3().setFromObject(ringRef.current);
      const purpleDiamondBoundingBox = new THREE.Box3().setFromObject(purpleDiamondRef.current);

      if (ringBoundingBox.intersectsBox(purpleDiamondBoundingBox)) {
        console.log("Purple diamond near the ring");
        if (selectedStone === "diamond") {
          // Reset diamond position if it was previously placed
          diamondRef.current?.position.set(...originalPositions.diamond);
        }
        purpleDiamondRef.current.position.set(-1.3, -0.15, 1.4);
        console.log("pur diamond set");
        setSelectedStone("purpleDiamond");
        console.log("selected stone ", selectedStone);
      } else {
        // Reset position if not near the ring
        purpleDiamondRef.current.position.set(...originalPositions.purpleDiamond);
      }
    }
  };

  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.5} />

        {/* Drag Controls for Diamond */}
        <DragControls
          axisLock="z"
          dragLimits={[[-3, 1], [-1.5, 1], undefined]}
          onDrag={(localMatrix) => {
            if (diamondRef.current) {
              const position = new THREE.Vector3();
              const quaternion = new THREE.Quaternion();
              const scale = new THREE.Vector3();
              localMatrix.decompose(position, quaternion, scale);
              diamondRef.current.position.copy(position);
            }
          }}
          onDragEnd={onDiamondDragEnd}
        >
          <mesh
            ref={diamondRef}
            position={[0, 0, 0]}
            rotation={[1, 1, 0]}
            scale={[0.8, 0.8, 0.8]}
          >
            <DiamondModel position={[2, -1, 3]} />
          </mesh>
        </DragControls>

        {/* Drag Controls for Purple Diamond */}
        <DragControls
          axisLock="z"
          dragLimits={[[-3, 1.5], [-1.5, 1], undefined]}
          onDrag={(localMatrix) => {
            if (purpleDiamondRef.current) {
              const position = new THREE.Vector3();
              const quaternion = new THREE.Quaternion();
              const scale = new THREE.Vector3();
              localMatrix.decompose(position, quaternion, scale);
              purpleDiamondRef.current.position.copy(position);
            }
          }}
          onDragEnd={onPurpleDiamondDragEnd}
        >
          <mesh
            ref={purpleDiamondRef}
            position={[2, 0, 0]}
            rotation={[1, 1, 0]}
            scale={[0.8, 0.8, 0.8]}
          >
            <PurpleDiamond position={[2, -1.4, 2.3]} />
          </mesh>
        </DragControls>

        <Suspense fallback={<Loading />}>
          <mesh ref={ringRef} position={[0, 0, 0]}>
            <Model
              position={[0, 0, 0]}
              rotation={[1.6, 1, 0]}
              scale={[0.7, 0.7, 0.7]}
            />
          </mesh>
        </Suspense>

        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default DragnDrop;
