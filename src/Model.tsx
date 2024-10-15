import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { Mesh, Material } from "three";

interface RingGLTF {
  nodes: {
    [key: string]: Mesh;
  };
  materials: {
    [key: string]: Material;
  };
}

export default function Model(props: GroupProps) {
  const { nodes, materials } = useGLTF("/ring.gltf") as unknown as RingGLTF;

  return (
    <group {...props} dispose={null}>
      {Object.keys(nodes).map((key) => {
        const node = nodes[key];
        if (node.isMesh) {
          return (
            <mesh
              key={key}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={node.material || materials["Scene_-_Root"]}
              scale={[0.2, 0.2, 0.2]}
              position={[0, 0, 0]}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

useGLTF.preload("/ring.gltf");
