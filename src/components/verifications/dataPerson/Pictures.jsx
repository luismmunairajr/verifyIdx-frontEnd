import { useState } from "react";
import Image from "next/image";
import unknow from "@/assets/unknowProfile.svg"

export default function Pictures({ person }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = (src) => {
    setSelectedImage(src);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="flex justify-center gap-4 2xl:justify-start 2xl:pl-20">
        {[
          { key: "photoIDFrontCrop", label: "Front Crop" },
          { key: "photoIDBackCrop", label: "Back Crop" },
          { key: "photoIDFaceCrop", label: "Face Crop" },
          { key: "photoIDPrimarySignatureCrop", label: "Signature Crop" },
        ].map(({ key, label }) => (
          <div key={key} className="w-[200px] h-[150px] flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">
            {person[key] ? (
              <Image
                className="cursor-pointer w-full h-full object-cover rounded-lg"
                src={`data:image/png;base64,${person[key]}` || unknow }
                alt={label}
                width={200}
                height={150}
                onClick={() => handleClick(`data:image/png;base64,${person[key]}`)}
              />
            ) : (
              <p className="text-sm text-gray-600 text-center">{label} não disponível</p>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={closePreview}
        >
          <div className="relative p-4">
            <Image
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain cursor-pointer"
              width={800}
              height={600}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
