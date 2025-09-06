import { FormDataTypes } from "@/types/formDataTypes";
import { useState } from "react";

const DEFAULT_VALUES = {
  width: 1024,
  height: 1024,
  model: "turbo",
};

const useGenerateImage = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateImages = async (formData: FormDataTypes) => {
    setLoading(true);
    setImageUrls([]);
    setError(null);

    const prompt = formData.prompt;
    const width = formData.width || DEFAULT_VALUES.width;
    const height = formData.height || DEFAULT_VALUES.height;
    const model = formData.model || DEFAULT_VALUES.model;

    // We will push image URLs one by one
    const urls: string[] = [];

    // Loop 9 times, between each request
    for (let i = 0; i < 6; i++) {
      const seed = Math.floor(Math.random() * 100000);

      const url = `https://image.pollinations.ai/prompt/${prompt}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

      try {
        const response = await fetch(url);
        console.log(response);

        if (response.ok) {
          urls.push(url);
        }
      } catch (err) {
        // urls.push(null);
        console.log(err);
      }

      // Update state after each image
      setImageUrls([...urls]);
    }
    setLoading(false);
  };

  return { imageUrls, loading, error, generateImages };
};

export default useGenerateImage;
