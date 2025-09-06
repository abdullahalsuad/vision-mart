"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import AdvancedSettings from "./AdvancedSettings";
import useGenerateImage from "@/hooks/useGenerateImage";
import { FormDataTypes } from "@/types/formDataTypes";
import NoImgFound from "./NoImgFound";
import ResultLayout from "./ResultLayout";

const ImgGenLayout = () => {
  const [width, setWidth] = useState<number>(1024);
  const [height, setHeight] = useState<number>(1024);

  const { imageUrls, loading, generateImages } = useGenerateImage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const formValues: FormDataTypes = {
      prompt: formData.get("prompt") as string,
      width: formData.get("width") ? Number(formData.get("width")) : undefined,
      height: formData.get("height")
        ? Number(formData.get("height"))
        : undefined,
      model: formData.get("model") as string | undefined,
    };

    //   for testing
    console.log(formValues);
    generateImages(formValues);

    form.reset();
  };

  return (
    <div className="w-8/12 mx-auto">
      <form onSubmit={handleSubmit}>
        {/* search */}
        <SearchBar />

        {/* Advanced setting */}
        <AdvancedSettings
          width={width}
          height={height}
          setWidth={setWidth}
          setHeight={setHeight}
        />
      </form>

      {/* result */}
      <div className=" border border-teal-900 border-dashed rounded-md">
        {imageUrls.length === 0 && !loading ? (
          <NoImgFound />
        ) : (
          <ResultLayout imageUrls={imageUrls}  />
        )}
      </div>
    </div>
  );
};

export default ImgGenLayout;
