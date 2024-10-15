import { lazy, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Text } from "@react-three/drei";

const Model = lazy(() => import("./Model"));
const DiamondModel = lazy(() => import("./DiamondModel"));
const PurpleDiamond = lazy(() => import("./PurpleDiamond"));

const Loading = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <Text fontSize={1} color="black" anchorX="center" anchorY="middle">
        Loading...
      </Text>
    </mesh>
  );
};

function App() {
  const [selectedStone, setSelectedStone] = useState("diamond");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-4 md:p-10 gap-5">
      <div className="md:col-span-2">
        <Canvas>
          <ambientLight intensity={1.5} />
          <OrbitControls />
          <Suspense fallback={<Loading />}>
            <Model />
            {selectedStone === "diamond" ? (
              <DiamondModel />
            ) : (
              selectedStone === "purple-diamond" && <PurpleDiamond />
            )}
          </Suspense>
          <Environment preset="sunset" />
        </Canvas>
      </div>
      <div className="md:col-span-1 flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Engagement Ring</h1>
        <div className="py-5">
          <h2 className="text-md font-semibold py-3">Choose Gem</h2>
          <div className="flex gap-3">
            <button
              className={`${
                selectedStone === "diamond" ? "bg-orange-300" : "bg-orange-100"
              } py-1 px-3 rounded-full`}
              onClick={() => setSelectedStone("diamond")}
            >
              Diamond
            </button>
            <button
              className={`${
                selectedStone === "purple-diamond"
                  ? "bg-orange-300"
                  : "bg-orange-100"
              } py-1 px-3 rounded-full`}
              onClick={() => setSelectedStone("purple-diamond")}
            >
              Purple Diamond
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
