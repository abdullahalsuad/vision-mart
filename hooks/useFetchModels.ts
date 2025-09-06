import { useEffect, useState } from "react";

const useFetchModels = () => {
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://image.pollinations.ai/models");
        const data = await response.json();
        setModels(data);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error from fetch models:", err.message);
        } else {
          console.error("Unknown error", err);
        }
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return { models, loading };
};

export default useFetchModels;
