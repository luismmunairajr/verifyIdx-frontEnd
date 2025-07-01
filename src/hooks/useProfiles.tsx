import { useEffect, useState } from "react";
import axiosInstance from "@/app/api/axios/axiosInstance";
import unknow from "@/assets/unknowProfile.svg";

interface Profile {
  verificationId: string;
  workflowId: string;
  thirdPartyReference: string;
  externalDatabaseRefID: string;
  startedAt: string;
  platform: string;
  deviceModel: string;
  userAgent: string;
  ipAddress: string;
  appID: string;
  deviceSDKVersion: string;
  photoIDBackCrop: string;
  photoIDFaceCrop: string;
  photoIDFrontCrop: string;
  photoIDPrimarySignatureCrop: string;
  auditTrailImage: string | null;
  status: string;
  fullName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  fatherFirstName: string;
  motherFirstName: string;
  idNumber: string;
  mrzLine1: string;
  mrzLine2: string;
  mrzLine3: string;
  issuingAuthority: string;
  dateOfExpiration: string;
  dateOfIssue: string;
  address1: string;
  address2: string;
  address3: string;
  height: string;
  sex: string;
  customField1: string;
  documentCountry: string;
  documentState: string;
  templateName: string;
  templateType: string;
  watchlistStatus: string;
  matchScore: string;
  matchStrength: string;
  primaryName: string;
  categories: string;
  category: string;
  pepStatus: string;
  matchedDateOfBirth: string;
  dateOfBirthResult: string;
  matchedLocation: string;
  locationResult: string;
  matchedGender: string;
  genderResult: string;
  matchedNacionality: string;
  nacionalityResult: string;
}

interface Field {
  fieldKey: string;
  value: string;
}

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);

        const workflowResponse = await axiosInstance.get("api/v1/workflows/68581c4f9e8cdae6fffc5f54");
        const verificationIds = workflowResponse.data.verifications?.map((v: any) => v.verificationId) || [];

        const verificationRequests = verificationIds.map((id: string) =>
          axiosInstance.get(`api/v1/verifications/${id}`).then(res => res.data)
        );

        const verificationData = await Promise.all(verificationRequests);

        const safeGetField = (doc: any, groupIdx: number, key: string): string => {
          return doc?.userConfirmedValues?.groups?.[groupIdx]?.fields?.find((f: Field) => f.fieldKey === key)?.value || "--";
        };

        const profilesData: Profile[] = verificationData.map((verification: any): Profile => {
          const result = verification?.products?.identity_verification?.results?.[0] || {};

          let documentData: any = null;
          try {
            const raw = result?.idscanOnly?.documentData;
            if (raw) documentData = JSON.parse(raw);
          } catch (e) {
            console.error("Erro ao fazer parse de documentData:", e);
          }

          return {
            verificationId: verification?.verificationId || "--",
            workflowId: verification?.workflowId || "--",
            thirdPartyReference: verification?.thirdPartyReference || "--",
            externalDatabaseRefID: result?.photoIdScanMatch?.externalDatabaseRefID || "--",
            startedAt: verification?.products?.identity_verification?.startedAt || "--",
            platform: result?.additionalSessionData?.platform || "--",
            deviceModel: result?.additionalSessionData?.deviceModel || "--",
            userAgent: result?.additionalSessionData?.userAgent || "--",
            ipAddress: result?.additionalSessionData?.ipAddress || "--",
            appID: result?.additionalSessionData?.appID || "--",
            deviceSDKVersion: result?.additionalSessionData?.deviceSDKVersion || "--",
            photoIDBackCrop: result?.idscanOnly?.photoIDBackCrop || unknow,
            photoIDFaceCrop: result?.idscanOnly?.photoIDFaceCrop || unknow,
            photoIDFrontCrop: result?.idscanOnly?.photoIDFrontCrop || unknow,
            photoIDPrimarySignatureCrop: result?.idscanOnly?.photoIDPrimarySignatureCrop || unknow,
            auditTrailImage: result?.liveness?.auditTrailImage || null,
            status: verification?.products?.identity_verification?.status || "--",
            fullName: safeGetField(documentData, 0, "fullName"),
            dateOfBirth: safeGetField(documentData, 0, "dateOfBirth"),
            placeOfBirth: safeGetField(documentData, 0, "placeOfBirth"),
            fatherFirstName: safeGetField(documentData, 0, "fatherFirstName"),
            motherFirstName: safeGetField(documentData, 0, "motherFirstName"),
            idNumber: safeGetField(documentData, 1, "idNumber"),
            mrzLine1: safeGetField(documentData, 1, "mrzLine1"),
            mrzLine2: safeGetField(documentData, 1, "mrzLine2"),
            mrzLine3: safeGetField(documentData, 1, "mrzLine3"),
            issuingAuthority: safeGetField(documentData, 1, "issuingAuthority"),
            dateOfExpiration: safeGetField(documentData, 1, "dateOfExpiration"),
            dateOfIssue: safeGetField(documentData, 1, "dateOfIssue"),
            address1: safeGetField(documentData, 2, "address1"),
            address2: safeGetField(documentData, 2, "address2"),
            address3: safeGetField(documentData, 2, "address3"),
            height: safeGetField(documentData, 3, "height"),
            sex: safeGetField(documentData, 3, "sex"),
            customField1: safeGetField(documentData, 4, "customField1"),
            documentCountry: documentData?.templateInfo?.documentCountry || "--",
            documentState: documentData?.templateInfo?.documentState || "--",
            templateName: documentData?.templateInfo?.templateName || "--",
            templateType: documentData?.templateInfo?.templateType || "--",
            watchlistStatus: verification?.products?.watchlist?.status || "--",
            matchScore: verification?.products?.watchlist?.results?.matchScore || "--",
            matchStrength: verification?.products?.watchlist?.results?.matchStrength || "--",
            primaryName: verification?.products?.watchlist?.results?.primaryName || "--",
            categories: verification?.products?.watchlist?.results?.categories || "--",
            category: verification?.products?.watchlist?.results?.category || "--",
            pepStatus: verification?.products?.watchlist?.results?.pepStatus || "--",
            matchedDateOfBirth: verification?.products?.watchlist?.results?.secondaryFieldResults?.[0]?.matchedDateTimeValue || "--",
            dateOfBirthResult: verification?.products?.watchlist?.results?.secondaryFieldResults?.[0]?.fieldResult || "--",
            matchedLocation: verification?.products?.watchlist?.results?.secondaryFieldResults?.[1]?.matchedValue || "--",
            locationResult: verification?.products?.watchlist?.results?.secondaryFieldResults?.[1]?.fieldResult || "--",
            matchedGender: verification?.products?.watchlist?.results?.secondaryFieldResults?.[2]?.matchedValue || "--",
            genderResult: verification?.products?.watchlist?.results?.secondaryFieldResults?.[2]?.fieldResult || "--",
            matchedNacionality: verification?.products?.watchlist?.results?.secondaryFieldResults?.[4]?.matchedValue || "--",
            nacionalityResult: verification?.products?.watchlist?.results?.secondaryFieldResults?.[4]?.fieldResult || "--",
          };
        });

        setProfiles(profilesData);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar os dados.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return { profiles, isLoading, error };
}