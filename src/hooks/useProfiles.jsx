"use client";

import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/app/api/axios/axiosInstance";
import unknow from "@/assets/unknowProfile.svg";

export function useProfiles(initialPage = 1, limit = 10) {
  const [profiles, setProfiles] = useState([]);
  const [meta, setMeta] = useState({ page: initialPage, limit, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [verificationDetails, setVerificationDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  // Normaliza a imagem base64 ou retorna default
  const normalizeBase64 = (value) => {
    if (!value) return unknow.src;
    if (value.startsWith("data:image")) return value;
    return `data:image/jpeg;base64,${value}`;
  };

  const fetchProfiles = useCallback(async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(
  `/api/axios/verifications?page=${page}&limit=${limit}`
);

        console.log("[useProfiles] Resposta recebida:", response.data);
      const data = response.data?.data || [];
      const metaResponse = response.data?.meta || {};

      const profilesData = data.map((item) => ({
        verificationId: item.verificationId || "--",
        fullName: item.fullname || "--",
        status: item.status || "--",
        auditTrailImage: normalizeBase64(item.auditTrailImage),
        startedAt: item.startedAt || new Date().toISOString(), // se tiver startedAt
      }));

      setProfiles((old) => [...old, ...profilesData]); // acumula páginas
      setMeta(metaResponse);
    } catch (err) {
      setError(err.message || "Erro ao buscar os dados.");
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  // Inicia na página inicial
  useEffect(() => {
    setProfiles([]);
    fetchProfiles(initialPage);
  }, [initialPage, fetchProfiles]);

  // Função para carregar próxima página
  const loadMore = () => {
  if (meta.page < meta.totalPages && !isLoading) {
    fetchProfiles(meta.page + 1);
    setMeta((old) => ({ ...old, page: old.page + 1 }));
  }
};


  const fetchVerificationDetails = async (verificationId) => {
    setIsLoadingDetails(true);
    setErrorDetails(null);

    try {
      const response = await axiosInstance.get(
        `/api/axios/verifications/${verificationId}`);
         console.log("[useProfiles] Detalhes recebidos:", response.data);
      const verification = response.data?.verification;
      if (!verification) throw new Error("Verificação não encontrada");

      const results = verification?.products?.identity_verification?.results || [];
      const r0 = results[0] || {};
      const documentData = r0?.idscanOnly?.documentData
        ? JSON.parse(r0.idscanOnly.documentData)
        : null;
      const additionalData = r0?.additionalSessionData || {};
      const normalize = (groupIdx, key) =>
        documentData?.userConfirmedValues?.groups?.[groupIdx]?.fields?.find(f => f.fieldKey === key)?.value || "--";

      const fullName = normalize(0, "fullName");
      const dateOfBirth = normalize(0, "dateOfBirth");
      const placeOfBirth = normalize(0, "placeOfBirth");
      const fatherFirstName = normalize(0, "fatherFirstName");
      const motherFirstName = normalize(0, "motherFirstName");
      const idNumber = normalize(1, "idNumber");
      const mrzLine1 = normalize(1, "mrzLine1");
      const mrzLine2 = normalize(1, "mrzLine2");
      const mrzLine3 = normalize(1, "mrzLine3");
      const issuingAuthority = normalize(1, "issuingAuthority");
      const dateOfExpiration = normalize(1, "dateOfExpiration");
      const dateOfIssue = normalize(1, "dateOfIssue");
      const address1 = normalize(2, "address1");
      const address2 = normalize(2, "address2");
      const address3 = normalize(2, "address3");
      const height = normalize(3, "height");
      const sex = normalize(3, "sex");
      const customField1 = normalize(4, "customField1");

      const documentCountry = documentData?.templateInfo?.documentCountry || "--";
      const documentState = documentData?.templateInfo?.documentState || "--";
      const templateName = documentData?.templateInfo?.templateName || "--";
      const templateType = documentData?.templateInfo?.templateType || "--";

      const verificationIdd = verification?.verificationId || "--";
      const thirdPartyReference = verification?.thirdPartyReference || "--";
      const workflowId = verification?.workflowId || "--";
      const externalDatabaseRefID = r0?.photoIdScanMatch?.externalDatabaseRefID || "--";
      const startedAt = verification?.products?.identity_verification?.startedAt || "--";
      const status = verification?.products?.identity_verification?.status || "--";

      const platform = additionalData?.platform || "--";
      const appID = additionalData?.appID || "--";
      const userAgent = additionalData?.userAgent || "--";
      const deviceModel = additionalData?.deviceModel || "--";
      const deviceSDKVersion = additionalData?.deviceSDKVersion || "--";
      const ipAddress = additionalData?.ipAddress || "--";

      const photoIDFaceCrop = normalizeBase64(r0?.idscanOnly?.photoIDFaceCrop) ?? unknow.src;
      const photoIDBackCrop = normalizeBase64(r0?.idscanOnly?.photoIDBackCrop) ?? unknow.src;
      const photoIDFrontCrop = normalizeBase64(r0?.idscanOnly?.photoIDFrontCrop) ?? unknow.src;
      const photoIDPrimarySignatureCrop = normalizeBase64(r0?.idscanOnly?.photoIDPrimarySignatureCrop) ?? unknow.src;
      const auditTrailImage = normalizeBase64(r0?.liveness?.auditTrailImage) ?? unknow.src;

      const watchlistStatus = verification?.products?.watchlist?.status || "--";
      const matchScore = verification?.products?.watchlist?.results?.matchScore || "--";
      const matchStrength = verification?.products?.watchlist?.results?.matchStrength || "--";
      const primaryName = verification?.products?.watchlist?.results?.primaryName || "--";
      const categories = verification?.products?.watchlist?.results?.categories || "--";
      const category = verification?.products?.watchlist?.results?.category || "--";
      const pepStatus = verification?.products?.watchlist?.results?.pepStatus || "--";
      const matchedDateOfBirth = verification?.products?.watchlist?.results?.secondaryFieldResults?.[0]?.matchedDateTimeValue || "--";
      const dateOfBirthResult = verification?.products?.watchlist?.results?.secondaryFieldResults?.[0]?.fieldResult || "--";
      const matchedLocation = verification?.products?.watchlist?.results?.secondaryFieldResults?.[1]?.matchedValue || "--";
      const locationResult = verification?.products?.watchlist?.results?.secondaryFieldResults?.[1]?.fieldResult || "--";
      const matchedGender = verification?.products?.watchlist?.results?.secondaryFieldResults?.[2]?.matchedValue || "--";
      const genderResult = verification?.products?.watchlist?.results?.secondaryFieldResults?.[2]?.fieldResult || "--";
      const matchedNacionality = verification?.products?.watchlist?.results?.secondaryFieldResults?.[4]?.matchedValue || "--";
      const nacionalityResult = verification?.products?.watchlist?.results?.secondaryFieldResults?.[4]?.fieldResult || "--";

      const detailedData = {
        fullName,
        dateOfBirth,
        placeOfBirth,
        fatherFirstName,
        motherFirstName,
        idNumber,
        mrzLine1,
        mrzLine2,
        mrzLine3,
        issuingAuthority,
        dateOfExpiration,
        dateOfIssue,
        address1,
        address2,
        address3,
        height,
        sex,
        customField1,
        documentCountry,
        documentState,
        templateName,
        templateType,
        verificationIdd,
        workflowId,
        thirdPartyReference,
        externalDatabaseRefID,
        status,
        startedAt,
        photoIDFaceCrop,
        photoIDBackCrop,
        photoIDFrontCrop,
        photoIDPrimarySignatureCrop,
        auditTrailImage,
        platform,
        deviceModel,
        userAgent,
        ipAddress,
        appID,
        deviceSDKVersion,
        watchlistStatus,
        matchScore,
        matchStrength,
        primaryName,
        categories,
        category,
        pepStatus,
        matchedDateOfBirth,
        dateOfBirthResult,
        matchedLocation,
        locationResult,
        matchedGender,
        genderResult,
        matchedNacionality,
        nacionalityResult,
      };

      setVerificationDetails(detailedData);
      setIsLoadingDetails(false);

      return detailedData;
    } catch (err) {
      setErrorDetails(err.message || "Erro ao buscar detalhes.");
      setIsLoadingDetails(false);
      throw err;
    }
  };

  return {
    profiles,
    meta,
    isLoading,
    error,
    verificationDetails,
    isLoadingDetails,
    errorDetails,
    fetchVerificationDetails,
    loadMore,
  };
}
