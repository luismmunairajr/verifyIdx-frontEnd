import unknow from "@/assets/unknowProfile.svg";
import { useLanguage } from "@/components/language/language-provider";

export default function Pictures({ person }) {
  const { t } = useLanguage();

  const toBase64Image = (value, label = "") => {
    if (!value) return null;

    if (typeof value === "string" && value.trim() !== "") {
      return `data:image/png;base64,${value}`;
    }

    if (typeof value === "object") {
      if ("base64String" in value && typeof value.base64String === "string" && value.base64String.trim() !== "") {
        return `data:image/png;base64,${value.base64String}`;
      }
      if ("data" in value && typeof value.data === "string" && value.data.trim() !== "") {
        return `data:image/png;base64,${value.data}`;
      }
    }

    return null;
  };

  const auditTrailImageSrc = toBase64Image(person?.auditTrailImage, "auditTrailImage");

  const crops = [
    { key: "photoIDFrontCrop", label: t("Front Crop") || "Front Crop" },
    { key: "photoIDBackCrop", label: t("Back Crop") || "Back Crop" },
    { key: "photoIDFaceCrop", label: t("Face Crop") || "Face Crop" },
    { key: "photoIDPrimarySignatureCrop", label: t("Signature Crop") || "Signature Crop" },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center 2xl:justify-start 2xl:pl-20">
      {/* Mostrar Liveness, se existir */}
      {auditTrailImageSrc && (
        <div className="w-[200px] h-[150px] flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">
          <img
            src={auditTrailImageSrc}
            alt="Liveness"
            width={200}
            height={150}
            className="object-cover w-full h-full rounded-lg"
            title="Liveness"
          />
        </div>
      )}

      {/* Mostrar as digitalizações (documentos), mesmo se tiver Liveness */}
      {crops.map(({ key, label }) => {
        const imageSrc = toBase64Image(person?.[key], label);
        return (
          <div
            key={key}
            className="w-[200px] h-[150px] flex items-center justify-center bg-gray-100 rounded-lg shadow-lg"
          >
            <img
              src={imageSrc || unknow.src}
              alt={imageSrc ? label : `${label} ${t("invalid")}`}
              width={200}
              height={150}
              className={`object-cover w-full h-full rounded-lg ${!imageSrc ? "opacity-50" : ""}`}
              title={!imageSrc ? `${label} ${t("invalid")}` : label}
            />
          </div>
        );
      })}
    </div>
  );
}
