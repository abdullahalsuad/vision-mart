import FailedToLoad from "./FailedToLoad";
import GeneratingLoading from "./GeneratingLoading";
import ResultImgCard from "./ResultImgCard";

// types
type ResultContainerProps = {
  imageUrl?: string;
};

const ResultContainer = ({ imageUrl }: ResultContainerProps) => {
  return (
    <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
      {/* If image URL exists */}
      {imageUrl ? (
        <ResultImgCard imageUrl={imageUrl} />
      ) : imageUrl === null ? (
        // If image failed to load
        <FailedToLoad />
      ) : (
        // Placeholder before image is generated
        <GeneratingLoading />
      )}
    </div>
  );
};

export default ResultContainer;
