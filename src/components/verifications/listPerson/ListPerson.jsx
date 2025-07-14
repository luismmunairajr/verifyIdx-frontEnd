import { useProfiles } from "@/hooks/useProfiles";
import InputSearch from "./Input.jsx";
import ListVerifications from "./ListVerifications";
import Loading from "@/components/Loading";
import { useState } from "react";
import { useLanguage } from "@/components/language/language-provider";

export default function ListPerson({ onSelectPerson }) {
  const [filterText, setFilterText] = useState("");
  const [showPending, setShowPending] = useState(true);
  const [showComplete, setShowComplete] = useState(true);
  const [showRejected, setShowRejected] = useState(true);

  const { profiles, isLoading, error } = useProfiles();
  const { t } = useLanguage();

  const STATUS_PENDING = "Pending";
  const STATUS_COMPLETE = "Complete";
  const STATUS_REJECTED = "Rejected";

  
  const filteredProfiles = [...profiles]
    .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
    .filter((person) => {
      const matchesText = (person.fullName || "")
        .toLowerCase()
        .includes(filterText.toLowerCase());

      const matchesStatus =
        (showPending && person.status === STATUS_PENDING) ||
        (showComplete && person.status === STATUS_COMPLETE) ||
        (showRejected && person.status === STATUS_REJECTED);

      return matchesText && matchesStatus;
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-96 h-screen bg-zinc-100 dark:bg-zinc-800">
        <Loading />
        <span className="sr-only">{t("loading")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-96 h-screen bg-zinc-100 dark:bg-zinc-900">
        <div className="text-red-600 dark:text-red-400">
          {t("error")}: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-100 flex w-96 text-black flex-col items-start p-4 space-y-6 overflow-y-auto dark:text-white dark:bg-zinc-800">
      <InputSearch
        filterText={filterText}
        setFilterText={setFilterText}
        showPending={showPending}
        showComplete={showComplete}
        showRejected={showRejected}
        setShowPending={setShowPending}
        setShowComplete={setShowComplete}
        setShowRejected={setShowRejected}
        t={t}
      />

      <h2 className="text-lg font-medium">{t("verifications")}</h2>

      <ListVerifications
        onSelectPerson={onSelectPerson}
        profiles={filteredProfiles.map((person) => ({
          ...person,
          statusTranslated: t(`status.${person.status.toLowerCase()}`),
        }))}
      />
    </div>
  );
}
