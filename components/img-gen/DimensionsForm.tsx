import { DimensionTypes } from "@/types/dimensionTypes";
import { InputField } from "./InputField";

const DimensionsForm = ({
  width,
  height,
  setWidth,
  setHeight,
}: DimensionTypes) => {
  return (
    <>
      {/* Width Input */}
      <div>
        <InputField
          label="Width"
          id="width"
          value={width}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWidth(parseInt(e.target.value))
          }
        />
      </div>
      {/* Height Input */}
      <div>
        <InputField
          label="Height"
          id="height"
          value={height}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setHeight(parseInt(e.target.value))
          }
        />
      </div>
    </>
  );
};

export default DimensionsForm;
