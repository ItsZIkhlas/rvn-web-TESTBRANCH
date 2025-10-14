import React from "react";

interface ImageBlockProps {
  width: number;
  height: number;
  isVideo?: boolean;
  src?: string;
  alt?: string;
}

function ImageBlock({ width, height, src, alt }: ImageBlockProps) {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={alt || "Image"}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          style={{ width: `${width}px`, height: `${height}px` }}
          className="bg-violet-700 rounded-md flex items-center justify-center"
        >
          <span className="p-2 rounded-lg border-violet-500 border-2">
            Image Placeholder
          </span>
        </div>
      )}
    </>
  );
}

export default ImageBlock;
