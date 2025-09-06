import ResultContainer from "./ResultContainer";

type ResultLayoutProps = {
  imageUrls: string[];
};

const ResultLayout = ({ imageUrls }: ResultLayoutProps) => {
  return (
    <>
      <div className="mt-6 p-2 py-10">
        <h3 className=" mb-4 font-bold text-lg">Result</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 p-2">
          {Array.from({ length: 6 }).map((_, index) => {
            const imageUrl = imageUrls[index];
            return <ResultContainer key={index} imageUrl={imageUrl} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ResultLayout;
