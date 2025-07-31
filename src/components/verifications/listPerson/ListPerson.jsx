"use client";

import { useState, useRef, useCallback } from "react";
import { useProfiles } from "@/hooks/useProfiles";
import InputSearch from "./Input";
import ListVerifications from "./ListVerifications";
import Loading from "@/components/Loading";
import { useLanguage } from "@/components/language/language-provider";

export default function ListPerson({ onSelectPerson }) {
  const {
    profiles,
    meta,
    isLoading,
    error,
    fetchVerificationDetails,
    isLoadingDetails,
    errorDetails,
    loadMore,
  } = useProfiles(1, 10);

  const { t } = useLanguage();

  const [filterText, setFilterText] = useState("");
  const [showPending, setShowPending] = useState(true);
  const [showComplete, setShowComplete] = useState(true);
  const [showRejected, setShowRejected] = useState(true);

  const STATUS_PENDING = "Pending";
  const STATUS_COMPLETE = "Complete";
  const STATUS_REJECTED = "Rejected";

  // Filtragem e ordenação
  const filteredProfiles = [...profiles]
   
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

  // Scroll infinito - observe o último perfil renderizado
  const observer = useRef();
  const lastProfileRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          meta.page < Math.ceil(meta.total / meta.limit)
        ) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, loadMore, meta]
  );

  // Handler para selecionar pessoa
  const handleSelectPerson = async (person) => {
    try {
      // Busca os detalhes da verificação pelo ID
      const details = await fetchVerificationDetails(person.verificationId);

      // Garante que o objeto de detalhes está presente
      if (!details) {
        console.warn("Detalhes da verificação não encontrados");
        return;
      }

      // Passa o objeto completo para o componente pai
      onSelectPerson(details);
    } catch (err) {
      console.error("Erro ao buscar detalhes:", err);
    }
  };

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

      {isLoadingDetails && (
        <div className="mb-2">
          <Loading />
        </div>
      )}

          <ListVerifications
      isLoading={isLoading}
      onSelectPerson={handleSelectPerson}
      profiles={filteredProfiles.map((person, index) => ({
        ...person,
        ref: index === filteredProfiles.length - 1 ? lastProfileRef : null,
      }))}
    />


      {errorDetails && (
        <div className="text-red-600 dark:text-red-400">
          {t("error")}: {errorDetails}
        </div>
      )}
    </div>
  );
}
