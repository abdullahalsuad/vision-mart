// types
type ModelPropsTypes = {
  loading: boolean;
  models: string[];
};

const ModelSelection = ({ models, loading }: ModelPropsTypes) => {
  return (
    <>
      <div>
        <label
          htmlFor="model"
          className="block text-sm font-bold text-zinc-700 mb-1"
        >
          Model
        </label>
        <select
          id="model"
          name="model"
          className="w-full px-3 py-2  border border-gray-300 rounded-md focus:ring-2  transition-colors"
        >
          {loading && (
            <option className=" text-white flex items-center">
              Loading Models...
            </option>
          )}
          {models.map((model: string) => (
            <option key={Math.random()} value={model}>
              {model.charAt(0).toUpperCase() + model.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ModelSelection;
