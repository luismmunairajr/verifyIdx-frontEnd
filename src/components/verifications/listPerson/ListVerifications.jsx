"use client";

import React from "react";
import PersonVerifications from "./PersonVerifications";
import unknow from "@/assets/unknowProfile.svg";
import { useLanguage } from "@/components/language/language-provider";
import PersonVerificationsSkeleton from "./PersonVerificationsSkeleton";

export default function ListVerifications({ onSelectPerson, profiles, isLoading }) {
  const { t } = useLanguage();


  if (isLoading && (!profiles || profiles.length === 0)) {
    return (
      <div className="flex flex-col space-y-2 w-full overflow-y-auto pr-1">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <PersonVerificationsSkeleton key={i} />
          ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 w-full overflow-y-auto pr-1">
      {profiles && profiles.length > 0 ? (
        <>
          {profiles.map((person) => (
            <PersonVerifications
              key={person.verificationId}
              name={person.fullName}
              status={t(person.status.trim())}  
              image={person.auditTrailImage || unknow.src}
              onClick={() => onSelectPerson(person)}
              ref={person.ref}
            />
          ))}
         
          {isLoading && (
            <div className="flex justify-center p-2">
              <PersonVerificationsSkeleton />
            </div>
          )}
        </>
      ) : (
        <div className="text-sm text-muted-foreground">
          {t("noPersonsAvailable")}
        </div>
      )}
    </div>
  );
}
