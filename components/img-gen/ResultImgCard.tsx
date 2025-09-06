"use client";

import Image from "next/image";
import { useState } from "react";

type ResultImgCardProps = {
  imageUrl: string;
};

const ResultImgCard = ({ imageUrl }: ResultImgCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(imageUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // reset after 1.5s
      });
    }
  };

  return (
    <div className="relative w-full">
      <Image
        height={600}
        width={600}
        src={imageUrl}
        alt="Generated"
        className="w-full h-48 object-cover rounded-md"
      />
      <button
        onClick={handleCopy}
        className="absolute bottom-2 right-2 bg-teal-800 text-white px-2 py-1 text-sm rounded-md hover:bg-teal-700 transition cursor-pointer"
      >
        {copied ? "Copied!" : "Copy URL"}
      </button>
    </div>
  );
};

export default ResultImgCard;
