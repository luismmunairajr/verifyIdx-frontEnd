import Image from "next/image";
import unknow from "@/assets/unknowProfile.svg";
import { useLanguage } from "@/components/language/language-provider";

export default function Pictures({ person }) {
  const { t } = useLanguage();

  // Verifica se é Liveness (tem foto do rosto capturada ao vivo)
  const isLiveness = !!person?.auditTrailImage;

  return (
    <div className="flex justify-center gap-4 2xl:justify-start 2xl:pl-20">
      {isLiveness ? (
        <div className="w-[200px] h-[150px] flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">
          <Image
            src={`data:image/png;base64,${person.auditTrailImage}`}
            alt="Liveness"
            width={200}
            height={150}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      ) : (
        // Se não for liveness, mostrar as fotos normais do documento
        <>
          {[
            { key: "photoIDFrontCrop", label: "Front Crop" },
            { key: "photoIDBackCrop", label: "Back Crop" },
            { key: "photoIDFaceCrop", label: "Face Crop" },
            { key: "photoIDPrimarySignatureCrop", label: "Signature Crop" },
          ].map(({ key, label }) => (
            <div key={key} className="w-[200px] h-[150px] flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">
              {person[key] ? (
                <Image
                  src={`data:image/png;base64,${person[key]}`}
                  alt={label}
                  width={200}
                  height={150}
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <p className="text-sm text-gray-600 text-center">
                  {label} {t("invalid")}
                </p>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
