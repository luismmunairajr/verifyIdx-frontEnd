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
          axiosInstance.get(`api/v1/verifications/${id}`).then(res => res.data).catch(() => null)
        );

        const verificationData = (await Promise.all(verificationRequests)).filter(Boolean);

        const profilesData = verificationData.map((verification) => {
          const results = verification?.products?.identity_verification?.results;
          if (!verification?.products || !results || results.length === 0) return null;

          const documentData = results?.[0]?.idscanOnly?.documentData
            ? JSON.parse(results[0].idscanOnly.documentData)
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

          const photoIDBackCrop = results?.[0]?.idscanOnly?.photoIDBackCrop || unknow;
          const photoIDFaceCrop = results?.[0]?.idscanOnly?.photoIDFaceCrop || unknow;
          const photoIDFrontCrop = results?.[0]?.idscanOnly?.photoIDFrontCrop || unknow;
          const photoIDPrimarySignatureCrop = results?.[0]?.idscanOnly?.photoIDPrimarySignatureCrop || unknow;
          const auditTrailImage = results?.[0]?.liveness?.auditTrailImage || null;

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
