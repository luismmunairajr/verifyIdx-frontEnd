import { useEffect, useState } from "react";
import axiosInstance from "@/app/api/axios/axiosInstance";
import unknow from "@/assets/unknowProfile.svg";

export function useProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

          useEffect(() => {
  const normalizeBase64 = (value) => {
    if (!value) return null;
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      if ("base64String" in value) return value.base64String;
      if ("data" in value) return value.data;
    }
    return null;
  };

  const fetchProfiles = async () => {
  try {
    setIsLoading(true);

    // 1. Buscar todos os workflows do tenant
    const workflowsResponse = await axiosInstance.get("/api/v1/workflows");
    const workflows = workflowsResponse.data?.data || [];

    // 2. Extrair todos os verificationIds de todos os workflows
    const verificationIds = workflows.flatMap(wf =>
      wf.verifications?.map(v => v.verificationId) || []
    );

    // 3. Buscar dados de todas as verificações individualmente
    const verificationRequests = verificationIds.map(id =>
      axiosInstance
        .get(`api/v1/verifications/${id}`)
        .then(res => res.data)
        .catch(() => null)
    );
    
    const verificationData = (await Promise.all(verificationRequests)).filter(Boolean);

    // 4. Filtrar verificações com pelo menos uma imagem válida
    const profilesData = verificationData
      .map((verification) => {
         
        const results = verification?.products?.identity_verification?.results;
        if (!verification?.products || !results || results.length === 0) return null;
        
        const r0 = results[0];
        const hasAnyImage =
          r0?.liveness?.auditTrailImage ||
          r0?.idscanOnly?.photoIDBackCrop ||
          r0?.idscanOnly?.photoIDFrontCrop ||
          r0?.idscanOnly?.photoIDFaceCrop ||
          r0?.idscanOnly?.photoIDPrimarySignatureCrop;

        if (!hasAnyImage) return null; 
        
       

        const documentData = r0?.idscanOnly?.documentData
          ? JSON.parse(r0.idscanOnly.documentData)
          : null;

        const verificationId = verification?.verificationId || "--";
        const workflowId = verification?.workflowId || "--";
        const thirdPartyReference = verification?.thirdPartyReference || "--";
        const externalDatabaseRefID = results?.[0]?.photoIdScanMatch?.externalDatabaseRefID || "--";
        const startedAt = verification?.products.identity_verification.startedAt || "--";

        const platform = results?.[0]?.additionalSessionData?.platform || "--";
        const deviceModel = results?.[0]?.additionalSessionData?.deviceModel || "--";
        const userAgent = results?.[0]?.additionalSessionData?.userAgent || "--";
        const ipAddress = results?.[0]?.additionalSessionData?.ipAddress || "--";
        const appID = results?.[0]?.additionalSessionData?.appID || "--";
        const deviceSDKVersion = results?.[0]?.additionalSessionData?.deviceSDKVersion || "--";

        const photoIDBackCrop = normalizeBase64(results?.[0]?.idscanOnly?.photoIDBackCrop) || unknow;
        const photoIDFaceCrop = normalizeBase64(results?.[0]?.idscanOnly?.photoIDFaceCrop) || unknow;
        const photoIDFrontCrop = normalizeBase64(results?.[0]?.idscanOnly?.photoIDFrontCrop) || unknow;
        const photoIDPrimarySignatureCrop = normalizeBase64(results?.[0]?.idscanOnly?.photoIDPrimarySignatureCrop) || unknow;
        const auditTrailImage = normalizeBase64(results?.[0]?.liveness?.auditTrailImage) || null;

       

          const status = verification?.products?.identity_verification?.status || "--";

          const fullName = documentData?.userConfirmedValues?.groups[0]?.fields.find(field => field.fieldKey === "fullName")?.value || "--";
          const dateOfBirth = documentData?.userConfirmedValues?.groups[0]?.fields.find(field => field.fieldKey === "dateOfBirth")?.value || "--";
          const placeOfBirth = documentData?.userConfirmedValues?.groups[0]?.fields.find(field => field.fieldKey === "placeOfBirth")?.value || "--";
          const fatherFirstName = documentData?.userConfirmedValues?.groups[0]?.fields.find(field => field.fieldKey === "fatherFirstName")?.value || "--";
          const motherFirstName = documentData?.userConfirmedValues?.groups[0]?.fields.find(field => field.fieldKey === "motherFirstName")?.value || "--";
          const idNumber = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "idNumber")?.value || "--";
          const mrzLine1 = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "mrzLine1")?.value || "--";
          const mrzLine2 = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "mrzLine2")?.value || "--";
          const mrzLine3 = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "mrzLine3")?.value || "--";
          const issuingAuthority = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "issuingAuthority")?.value || "--";
          const dateOfExpiration = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "dateOfExpiration")?.value || "--";
          const dateOfIssue = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "dateOfIssue")?.value || "--";
          const address1 = documentData?.userConfirmedValues?.groups[2]?.fields.find(field => field.fieldKey === "address1")?.value || "--";
          const address2 = documentData?.userConfirmedValues?.groups[2]?.fields.find(field => field.fieldKey === "address2")?.value || "--";
          const address3 = documentData?.userConfirmedValues?.groups[2]?.fields.find(field => field.fieldKey === "address3")?.value || "--";
          const height = documentData?.userConfirmedValues?.groups[3]?.fields.find(field => field.fieldKey === "height")?.value || "--";
          const sex = documentData?.userConfirmedValues?.groups[3]?.fields.find(field => field.fieldKey === "sex")?.value || "--";
          const customField1 = documentData?.userConfirmedValues?.groups[4]?.fields.find(field => field.fieldKey === "customField1")?.value || "--";
          const documentCountry = documentData?.templateInfo?.documentCountry || "--";
          const documentState = documentData?.templateInfo?.documentState || "--";
          const templateName = documentData?.templateInfo?.templateName || "--";
          const templateType = documentData?.templateInfo?.templateType || "--";

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

          return {
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
            verificationId,
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
            nacionalityResult
          };
        }).filter(Boolean);

        setProfiles(profilesData);
      } catch (err) {
        setError(err.message || "Erro ao buscar os dados.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return { profiles, isLoading, error };
}
