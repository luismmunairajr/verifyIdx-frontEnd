"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language/language-provider";
import { CountrySelect } from "./CountrySelect";
import { CitySelect } from "./CitySelect";
import { useSession } from "next-auth/react";
import axiosInstance from "@/app/api/axios/axiosInstance";
import { toast } from "sonner";

export default function CompanyInformation() {
  const { t } = useLanguage();
  const { data: session } = useSession();

  const [companyInfo, setCompanyInfo] = useState({
    legalName: "",
    shortName: "",
    taxId: "",
    country: "",
    city: "",
  });

  const [contactDetails, setContactDetails] = useState({
    accountManager: "",
    generalEmail: "",
    phoneNumber: "",
    supportTechnical: "",
    supportEmail: "",
    phoneNumberSupportTechnical: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const tenantRes = await axiosInstance.get('/api/axios/admin-settings/companyinformation');

        
        const tenant = tenantRes.data;

        setCompanyInfo({
          legalName: tenant.legalName || "",
          shortName: tenant.shortName || "",
          taxId: tenant.taxID || "",
          country: tenant.country || "",
          city: tenant.addressDetails || "",
        });

        if (tenant.accountManagerId) {
          const managerRes = await axiosInstance.get(
            `/users/${tenant.accountManagerId}`
          );
          const manager = managerRes.data;

          setContactDetails((prev) => ({
            ...prev,
            accountManager: manager.fullName || "",
            generalEmail: manager.email || "",
            phoneNumber: manager.phone || "",
          }));
        }

        if (tenant.technicalManagerId) {
          const techRes = await axiosInstance.get(
            `/users/${tenant.technicalManagerId}`
          );
          const tech = techRes.data;

          setContactDetails((prev) => ({
            ...prev,
            supportTechnical: tech.fullName || "",
            supportEmail: tech.email || "",
            phoneNumberSupportTechnical: tech.phone || "",
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error(t("errorLoadingCompanyData"));
      }
    };

    fetchData();
  }, [session, t]);

  function handleCompanyInfoChange(field, value) {
    setCompanyInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <div className="p-6 space-y-4 dark:zinc-900">
      <div className="flex flex-col rounded-xl w-full 2xl:w-[1000px] gap-10">
        <h3 className="text-2xl font-bold">{t("companyInformation")}</h3>

        <ViewGroup label={t("legalName")} value={companyInfo.legalName} />
        <ViewGroup label={t("shortName")} value={companyInfo.shortName} />
        <ViewGroup label={t("taxId")} value={companyInfo.taxId} />

        <hr />
        <h3 className="text-2xl font-bold">{t("contactDetails")}</h3>

        <ViewGroup label={t("accountManager")} value={contactDetails.accountManager} />
        <ViewGroup label={t("generalEmail")} value={contactDetails.generalEmail} />
        <ViewGroup label={t("phoneNumber")} value={contactDetails.phoneNumber} />
        <ViewGroup label={t("supportTechnical")} value={contactDetails.supportTechnical} />
        <ViewGroup label={t("supportEmail")} value={contactDetails.supportEmail} />
        <ViewGroup
          label={t("phoneNumberSupportTechnical")}
          value={contactDetails.phoneNumberSupportTechnical}
        />

        <hr />
        <h3 className="text-2xl font-bold">{t("addressDetails")}</h3>
        <CountrySelect
          defaultValue={companyInfo.country}
          disabled
          onChange={() => {}}
        />
        <CitySelect
          defaultValue={companyInfo.city}
          disabled
          onChange={() => {}}
        />
      </div>
    </div>
  );
}

function ViewGroup({ label, value }) {
  return (
    <div className="flex justify-between w-[700px]">
      <div className="w-52">
        <h4 className="font-semibold">{label}</h4>
      </div>
      <p className="w-96 py-2 px-3 rounded-md bg-gray-100 border text-sm text-gray-700">
        {value || "—"}
      </p>
    </div>
  );
}
