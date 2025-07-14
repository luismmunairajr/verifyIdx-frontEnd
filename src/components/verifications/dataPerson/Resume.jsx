import { Calendar, Hash } from "lucide-react";
import Badges from "./Badges";
import Pictures from "./Pictures.jsx";
import unknow from "@/assets/unknowProfile.svg";
import { useFormattedDate } from "@/hooks/useFormattedDate";

export default function Resume({ person, hidePictures }) {
  const startedAtFormatted = useFormattedDate(person?.startedAt);

  // Função para normalizar base64
  const normalizeBase64 = (value) => {
    if (!value) return null;
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      if ("base64String" in value) return value.base64String;
      if ("data" in value) return value.data;
    }
    return null;
  };

  // Decide qual imagem exibir: auditTrail, profileImage ou imagem padrão
  const auditTrail = normalizeBase64(person?.auditTrailImage);
  const profileImage = normalizeBase64(person?.profileImage);

  let profileSrc = unknow.src;
  if (auditTrail) {
    profileSrc = `data:image/png;base64,${auditTrail}`;
  } else if (profileImage) {
    profileSrc = `data:image/png;base64,${profileImage}`;
  }

  return (
    <div className="flex flex-col space-y-10 dark:text-white">
      <div className="flex space-x-10 w-full">
        <img
          src={profileSrc}
          alt="Profile Picture"
          width={160}
          height={160}
          className="size-40 aspect-square rounded-full object-cover"
        />
        <div className="space-y-4 flex flex-col items-start justify-center w-full">
          <h2 className="font-semibold text-lg">{person.fullName}</h2>
          <div className="flex space-x-4 items-center">
            <Calendar strokeWidth={1} />
            <p>{startedAtFormatted}</p>
          </div>
          <div className="flex space-x-4 items-center">
            <Hash strokeWidth={1} />
            <p>{person.idNumber}</p>
          </div>
        </div>
      </div>

      <Badges person={person} />

      {!hidePictures && (
        <Pictures
          person={person}
          livenessImage={auditTrail}
        />
      )}
    </div>
  );
}
