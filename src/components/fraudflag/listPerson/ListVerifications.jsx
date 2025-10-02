"use client";

import React, { useEffect, useRef } from "react";
import PersonVerifications from "./PersonVerifications";
import unknow from "@/assets/unknowProfile.svg";
import { useLanguage } from "@/components/language/language-provider";
import PersonVerificationsSkeleton from "./PersonVerificationsSkeleton";

export default function ListVerifications({
  onSelectPerson,
  profiles,
  isLoading,
  resetScroll = false,
  onScrollReseted = () => {},
}) {
  const { t } = useLanguage();
  const listRef = useRef(null);

  useEffect(() => {
    if (resetScroll && listRef.current) {
      listRef.current.scrollTop = 0;
      onScrollReseted();
    }
  }, [resetScroll, onScrollReseted]);

  return (
    <div
      className="flex flex-col space-y-2 w-full overflow-y-auto pr-1"
      ref={listRef}
    >
      {isLoading && profiles.length === 0 ? (
        Array(7)
          .fill(0)
          .map((_, i) => <PersonVerificationsSkeleton key={i} />)
      ) : profiles && profiles.length > 0 ? (
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
