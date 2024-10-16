import { DragControls, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import DiamondModel from "./DiamondModel";
import * as THREE from "three";
import { Mesh } from "three";
import Model from "./Model";

function DragnDrop() {
  const diamondRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  const controlsRef = useRef(null);

  const onDragEnd = () => {
    // Ensure refs are not null before performing operations
    if (diamondRef.current && ringRef.current) {
      // Create bounding boxes after confirming the objects exist
      const ringBoundingBox = new THREE.Box3().setFromObject(ringRef.current);
      const diamondBoundingBox = new THREE.Box3().setFromObject(
        diamondRef.current
      );

      // Check if the diamond is near the ring
      if (ringBoundingBox.intersectsBox(diamondBoundingBox)) {
        // Snap diamond to the ring
        console.log("near the ring");
       
        
        diamondRef.current.position.set(-1.5, -0.35, 1.3);
      }
    }
  };

  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.5} />

        <DragControls
          axisLock="z"
          dragLimits={[[-9, 3], [-5, 1], undefined]}
          ref={controlsRef}
          onDrag={(localMatrix) => {
            // Extract position, rotation, and scale from the localMatrix
            const position = new THREE.Vector3();
            const quaternion = new THREE.Quaternion();
            const scale = new THREE.Vector3();

            // Decompose the matrix into position, rotation (quaternion), and scale
            localMatrix.decompose(position, quaternion, scale);

            // Now use the extracted position to update the diamond's position
            if (diamondRef.current) {
              diamondRef.current.position.copy(position); // Set the position of the diamond mesh
            }
          }}
          onDragEnd={onDragEnd}
        >
          <mesh ref={diamondRef} position={[0, 0, 0]} rotation={[1, 1, 0]} scale={[0.8, 0.8, 0.8]}>
         
            <DiamondModel position={[2, -1, 3]}  />
          </mesh>
        </DragControls>

        <Suspense fallback={null}>
          <mesh ref={ringRef} position={[0, 0, 0]}>
          {/* <primitive object={new THREE.AxesHelper(53)} /> */}
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
}

export default DragnDrop;
