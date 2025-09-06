// import useFetchModels from "../../hooks/useFetchModels";
import { DimensionTypes } from "@/types/dimensionTypes";
import DimensionsForm from "./DimensionsForm";
import ModelSelection from "./ModelSelection";
import useFetchModels from "@/hooks/useFetchModels";

const AdvancedSettings = ({
  width,
  height,
  setWidth,
  setHeight,
}: DimensionTypes) => {
  const { models, loading } = useFetchModels();

  return (
    <>
      <div className="border border-gray-200 mb-6 rounded-lg p-4 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Model Selection */}
          <ModelSelection models={models} loading={loading} />

          {/* Dimensions Form */}
          <DimensionsForm
            width={width}
            height={height}
            setWidth={setWidth}
            setHeight={setHeight}
          />
        </div>
      </div>
    </>
  );
};

export default AdvancedSettings;
