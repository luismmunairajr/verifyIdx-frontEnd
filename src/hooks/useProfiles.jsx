import { useEffect, useState } from "react";
import axiosInstance from "@/app/api/axios/axiosInstance";
import unknow from "@/assets/unknowProfile.svg";

export function useProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);

        const workflowResponse = await axiosInstance.get("api/v1/workflows/67b873ee3d5248569930e801");
        const verificationIds = workflowResponse.data.verifications?.map(v => v.verificationId) || [];

  
        const verificationRequests = verificationIds.map(id =>
          axiosInstance.get(`api/v1/verifications/${id}`).then(res => res.data)
        );

        const verificationData = await Promise.all(verificationRequests);

        // Passo 3: Mapear os dados no mesmo formato anterior
        const profilesData = verificationData.map((verification) => {
          const documentData = verification?.products?.identity_verification?.results?.[0]?.idscanOnly?.documentData
            ? JSON.parse(verification.products.identity_verification.results[0].idscanOnly.documentData)
            : null;

          // ... Aqui permanece o mesmo código de extração dos dados ...

          const verificationId = verification?.verificationId || "N/A";
          const workflowId = verification?.workflowId || "N/A";
          const thirdPartyReference = verification?.thirdPartyReference || "N/A";
          const externalDatabaseRefID = verification?.products?.identity_verification?.results?.[0]?.photoIdScanMatch?.externalDatabaseRefID || "N/A";
          const startedAt = verification?.products.identity_verification.startedAt || "N/A";

          const platform = verification?.products?.identity_verification?.results[0]?.additionalSessionData?.platform || "N/A";
          const deviceModel = verification.products?.identity_verification?.results[0]?.additionalSessionData?.deviceModel || "N/A";
          const userAgent = verification?.products?.identity_verification?.results[0]?.additionalSessionData?.userAgent || "N/A";
          const ipAddress = verification?.products?.identity_verification?.results[0]?.additionalSessionData?.ipAddress || "N/A";
          const appID = verification?.products?.identity_verification?.results[0]?.additionalSessionData?.appID || "N/A";
          const deviceSDKVersion = verification?.products?.identity_verification?.results[0]?.additionalSessionData?.deviceSDKVersion || "N/A";

          const photoIDBackCrop = verification?.products?.identity_verification?.results?.[0]?.idscanOnly?.photoIDBackCrop || unknow;
          const photoIDFaceCrop = verification?.products?.identity_verification?.results?.[0]?.idscanOnly?.photoIDFaceCrop || unknow;
          const photoIDFrontCrop = verification?.products?.identity_verification?.results?.[0]?.idscanOnly?.photoIDFrontCrop || unknow;
          const photoIDPrimarySignatureCrop = verification?.products?.identity_verification?.results?.[0]?.idscanOnly?.photoIDPrimarySignatureCrop || unknow;
          const auditTrailImage = verification?.products?.identity_verification?.results?.[0]?.liveness?.auditTrailImage || null;

          const status = verification?.products?.identity_verification?.status || "N/A";

          const fullName = documentData?.userConfirmedValues?.groups[0]?.fields.find(field => field.fieldKey === "fullName")?.value || "N/A";
          const dateOfBirth = documentData?.userConfirmedValues?.groups[0]?.fields.find(field => field.fieldKey === "dateOfBirth")?.value || "N/A";
          const placeOfBirth = documentData?.userConfirmedValues?.groups[0]?.fields.find(field => field.fieldKey === "placeOfBirth")?.value || "N/A";
          const fatherFirstName = documentData?.userConfirmedValues?.groups[0]?.fields.find(field => field.fieldKey === "fatherFirstName")?.value || "N/A";
          const motherFirstName = documentData?.userConfirmedValues?.groups[0]?.fields.find(field => field.fieldKey === "motherFirstName")?.value || "N/A";
          const idNumber = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "idNumber")?.value || "N/A";
          const mrzLine1 = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "mrzLine1")?.value || "N/A";
          const mrzLine2 = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "mrzLine2")?.value || "N/A";
          const mrzLine3 = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "mrzLine3")?.value || "N/A";
          const issuingAuthority = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "issuingAuthority")?.value || "N/A";
          const dateOfExpiration = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "dateOfExpiration")?.value || "N/A";
          const dateOfIssue = documentData?.userConfirmedValues?.groups[1]?.fields.find(field => field.fieldKey === "dateOfIssue")?.value || "N/A";
          const address1 = documentData?.userConfirmedValues?.groups[2]?.fields.find(field => field.fieldKey === "address1")?.value || "N/A";
          const address2 = documentData?.userConfirmedValues?.groups[2]?.fields.find(field => field.fieldKey === "address2")?.value || "N/A";
          const address3 = documentData?.userConfirmedValues?.groups[2]?.fields.find(field => field.fieldKey === "address3")?.value || "N/A";
          const height = documentData?.userConfirmedValues?.groups[3]?.fields.find(field => field.fieldKey === "height")?.value || "N/A";
          const sex = documentData?.userConfirmedValues?.groups[3]?.fields.find(field => field.fieldKey === "sex")?.value || "N/A";
          const customField1 = documentData?.userConfirmedValues?.groups[4]?.fields.find(field => field.fieldKey === "customField1")?.value || "N/A";
          const documentCountry = documentData?.templateInfo?.documentCountry || "N/A";
          const documentState = documentData?.templateInfo?.documentState || "N/A";
          const templateName = documentData?.templateInfo?.templateName || "N/A";
          const templateType = documentData?.templateInfo?.templateType || "N/A";

          // Watchlist (idem)
          const watchlistStatus = verification?.products?.watchlist?.status || "N/A"
          const matchScore = verification?.products?.watchlist?.results?.matchScore || "N/A"
          const matchStrength = verification?.products?.watchlist?.results?.matchStrength || "N/A"
          const primaryName = verification?.products?.watchlist?.results?.primaryName || "N/A"
          const categories = verification?.products?.watchlist?.results?.categories || "N/A"
          const category = verification?.products?.watchlist?.results?.category || "N/A"
          const pepStatus = verification?.products?.watchlist?.results?.pepStatus || "N/A"
          const matchedDateOfBirth = verification?.products?.watchlist?.results?.secondaryFieldResults?.[0]?.matchedDateTimeValue || "N/A"
          const dateOfBirthResult = verification?.products?.watchlist?.results?.secondaryFieldResults?.[0]?.fieldResult || "N/A"
          const matchedLocation = verification?.products?.watchlist?.results?.secondaryFieldResults?.[1]?.matchedValue || "N/A"
          const locationResult = verification?.products?.watchlist?.results?.secondaryFieldResults?.[1]?.fieldResult || "N/A"
          const matchedGender = verification?.products?.watchlist?.results?.secondaryFieldResults?.[2]?.matchedValue || "N/A"
          const genderResult = verification?.products?.watchlist?.results?.secondaryFieldResults?.[2]?.fieldResult || "N/A"
          const matchedNacionality = verification?.products?.watchlist?.results?.secondaryFieldResults?.[4]?.matchedValue || "N/A"
          const nacionalityResult = verification?.products?.watchlist?.results?.secondaryFieldResults?.[4]?.fieldResult || "N/A"

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
        });

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
