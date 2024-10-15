import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { Mesh, Material } from "three";

interface DiamondGLTF {
  nodes: {
    pCone1_DiamondOutside_0: Mesh;
  };
  materials: {
    [key: string]: Material;
  };
}

export default function DiamondModel(props: GroupProps) {
  const { nodes, materials } = useGLTF(
    "/diamond/diamond.gltf"
  ) as unknown as DiamondGLTF;
  console.log("d: ", nodes);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCone1_DiamondOutside_0.geometry}
        material={
          nodes.pCone1_DiamondOutside_0.material || materials["Scene_-_Root"]
        }
        scale={[0.6, 0.6, 0.6]}
        position={[1.3, 1.6, -0.6]}
        rotation={[-0.25, 0, -0.5]}
      />
    </group>
  );
}

useGLTF.preload("/diamond/diamond.gltf");
