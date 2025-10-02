"use client";

import React, { useState } from "react";
import unknow from "@/assets/unknowProfile.svg";
import { useLanguage } from "@/components/language/language-provider";
import Image from "next/image";
import { X } from "lucide-react";

export default function Pictures({ person }) {
  const { t } = useLanguage();
  const [showFullImage, setShowFullImage] = useState(null); // guarda a imagem clicada

  const toBase64Image = (value) => {
    if (!value) return null;

    if (typeof value === "string" && value.trim() !== "") {
      if (value.startsWith("data:image")) return value;
      return `data:image/png;base64,${value}`;
    }

    if (typeof value === "object") {
      const base64String = value.base64String || value.data || null;
      if (!base64String) return null;
      if (base64String.startsWith("data:image")) return base64String;
      return `data:image/png;base64,${base64String}`;
    }

    return null;
  };

  const imageSrc = toBase64Image(person.auditTrailImage) || unknow.src;

  const crops = [
    { key: "photoIDFrontCrop", label: t("Front Crop") || "Front Crop" },
    { key: "photoIDBackCrop", label: t("Back Crop") || "Back Crop" },
    { key: "photoIDFaceCrop", label: t("Face Crop") || "Face Crop" },
    { key: "photoIDPrimarySignatureCrop", label: t("Signature Crop") || "Signature Crop" },
  ];

  return (
    <>
      {showFullImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-black bg-white bg-opacity-80 rounded-full p-1"
              onClick={() => setShowFullImage(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={showFullImage}
              alt="Full view"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center 2xl:justify-start 2xl:pl-20">
        {/* Liveness */}
        {imageSrc && (
          <div className="w-[200px] h-[150px] flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">
            <Image
              src={imageSrc}
              alt="Audit Trail"
              width={200}
              height={150}
              className="object-cover w-full h-full rounded-lg cursor-pointer"
              onClick={() => setShowFullImage(imageSrc)}
            />
          </div>
        )}

        {/* Document crops */}
        {crops.map(({ key, label }) => {
          const cropImageSrc = toBase64Image(person[key]) || unknow.src;

          return (
            <div
              key={key}
              className="w-[200px] h-[150px] flex items-center justify-center bg-gray-100 rounded-lg shadow-lg"
            >
              <Image
                src={cropImageSrc}
                alt={cropImageSrc !== unknow.src ? label : `${label} ${t("invalid")}`}
                width={200}
                height={150}
                className={`object-cover w-full h-full rounded-lg cursor-pointer ${
                  cropImageSrc === unknow.src ? "opacity-50" : ""
                }`}
                title={cropImageSrc !== unknow.src ? label : `${label} ${t("invalid")}`}
                onClick={() => setShowFullImage(cropImageSrc)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
