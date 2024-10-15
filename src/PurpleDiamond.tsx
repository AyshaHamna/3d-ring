import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { Mesh, Material } from "three";

interface DiamondGLTF {
  nodes: {
    Diamond_Crystal_0: Mesh;
  };
  materials: {
    [key: string]: Material;
  };
}

export default function PurpleDiamond(props: GroupProps) {
  const { nodes, materials } = useGLTF(
    "/purple-diamond/purple-diamond.gltf"
  ) as unknown as DiamondGLTF;
  console.log("pur d: ", nodes);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Diamond_Crystal_0.geometry}
        material={nodes.Diamond_Crystal_0.material || materials["Scene_-_Root"]}
        scale={[0.07, 0.07, 0.07]}
        position={[1.52, 2.1, -0.75]}
        rotation={[Math.PI / 2.5, -0.5, 0]}
      />
    </group>
  );
}

useGLTF.preload("/purple-diamond/purple-diamond.gltf");
