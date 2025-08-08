"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import axiosInstance from "@/app/api/axios/axiosInstance";
import unknow from "@/assets/unknowProfile.svg";

export function useProfiles(initialPage = 1, limit = 10) {
  const [profiles, setProfiles] = useState([]);
  const [meta, setMeta] = useState({ page: initialPage, limit, total: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const [verificationDetails, setVerificationDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  const normalizeBase64 = (value) => {
    if (!value) return unknow.src;
    if (value.startsWith("data:image")) return value;
    return `data:image/jpeg;base64,${value}`;
  };

  const fetchProfiles = useCallback(
    async (page) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(
          `/api/axios/verifications?page=${page}&limit=${limit}`
        );

        const data = response.data?.data || [];
        const metaResponse = response.data?.meta || {};

        const profilesData = data.map((item) => ({
          verificationId: item.verificationId || "--",
          fullName: item.fullname || "--",
          status: item.status || "--",
          auditTrailImage: normalizeBase64(item.auditTrailImage),
          startedAt: item.startedAt || new Date().toISOString(),
        }));

        // ✅ NÃO reordenar — apenas concatenar as páginas
        setProfiles((old) => [...old, ...profilesData]);

        setMeta({
          ...metaResponse,
          page,
        });
      } catch (err) {
        setError(err.message || "Erro ao buscar os dados.");
      } finally {
        setIsLoading(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    setProfiles([]);
    fetchProfiles(initialPage);
  }, [initialPage, fetchProfiles]);

  const loadMore = () => {
    if (meta.page < meta.totalPages && !isLoading) {
      fetchProfiles(meta.page + 1);
    }
  };


  const fetchVerificationDetails = async (verificationId) => {
    setIsLoadingDetails(true);
    setErrorDetails(null);

    try {
      const response = await axiosInstance.get(`/api/axios/verifications/${verificationId}`);
      const verification = response.data?.verification;
      if (!verification) throw new Error("Verificação não encontrada");

      const identityVerification = verification.identity_verification;
      if (!identityVerification) throw new Error("identity_verification não encontrada");

      const results = identityVerification.results || [];
      const r0 = results[0] || {};
      const documentData = r0?.idscanOnly?.documentData
        ? JSON.parse(r0.idscanOnly.documentData)
        : null;
      const additionalData = r0?.idscanOnly?.additionalSessionData || {};

      const normalize = (groupIdx, key) =>
        documentData?.userConfirmedValues?.groups?.[groupIdx]?.fields?.find(f => f.fieldKey === key)?.value || "--";

      const detailedData = {
        fullName: normalize(0, "fullName"),
        dateOfBirth: normalize(0, "dateOfBirth"),
        placeOfBirth: normalize(0, "placeOfBirth"),
        idNumber: normalize(1, "idNumber"),
        mrzLine1: normalize(1, "mrzLine1"),
        mrzLine2: normalize(1, "mrzLine2"),
        mrzLine3: normalize(1, "mrzLine3"),
        issuingAuthority: normalize(1, "issuingAuthority"),
        dateOfIssue: normalize(1, "dateOfIssue"),
        dateOfExpiration: normalize(1, "dateOfExpiration"),
        address1: normalize(2, "address1"),
        address2: normalize(2, "address2"),
        address3: normalize(2, "address3"),
        sex: normalize(3, "sex"),
        height: normalize(3, "height"),
        customField1: normalize(4, "customField1"),
        fatherName: normalize(4, "customField2"),
        motherName: normalize(4, "customField3"),
        documentCountry: documentData?.templateInfo?.documentCountry || "--",
        templateName: documentData?.templateInfo?.templateName || "--",
        templateType: documentData?.templateInfo?.templateType || "--",
        verificationId: verification.verificationId || "--",
        workflowId: verification.workflowId || "--",
        thirdPartyReference: verification.thirdPartyReference || "--",
        startedAt: identityVerification.startedAt || "--",
        status: identityVerification.status || "--",
        platform: additionalData.platform || "--",
        appID: additionalData.appID || "--",
        userAgent: additionalData.userAgent || "--",
        deviceModel: additionalData.deviceModel || "--",
        deviceSDKVersion: additionalData.deviceSDKVersion || "--",
        ipAddress: additionalData.ipAddress || "--",
        auditTrailImage: normalizeBase64(r0?.liveness?.auditTrailImage) || null,
        livenessVerified:
          r0?.liveness?.success === true &&
          r0?.liveness?.faceScanSecurityChecks?.faceScanLivenessCheckSucceeded === true,
        photoIDFaceCrop: r0?.idscanOnly?.photoIDFaceCrop || null,
        photoIDBackCrop: r0?.idscanOnly?.photoIDBackCrop || null,
        photoIDFrontCrop: r0?.idscanOnly?.photoIDFrontCrop || null,
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
