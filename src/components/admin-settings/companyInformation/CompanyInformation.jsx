"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/language/language-provider";
import { CountrySelect } from "./CountrySelect";
import { CitySelect } from "./CitySelect";
import { TimezoneSelect } from "./TimezoneSelect";
import { useSession } from "next-auth/react";
import axiosInstance from "@/app/api/axios/axiosInstance_midleware";
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
    timeZone: "",
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
        if (!session?.user?.tenantId) {
          toast.error("Tenant ID not found.");
          return;
        }

        const tenantRes = await axiosInstance.get(
          `/tenants/${session.user.tenantId}`);
        const tenant = tenantRes.data;

        setCompanyInfo({
          legalName: tenant.legalName || "",
          shortName: tenant.shortName || "",
          taxId: tenant.taxID || "",
          country: tenant.country || "",
          city: tenant.addressDetails || "",
          timeZone: tenant.timeZone || "",
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
        toast.error("Erro ao carregar dados da empresa.");
      }
    };

    fetchData();
  }, [session]);

  function handleCompanyInfoChange(field, value) {
    setCompanyInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleContactDetailsChange(field, value) {
    setContactDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const handleUpdate = async () => {
    try {
      const payload = {
        ...companyInfo,
        ...contactDetails,
        tenantId: session?.user?.tenantId,
      };

      const res = await axiosInstance.put("/api/-----", payload);

      if (res.status === 200) {
        toast.success("Informações atualizadas com sucesso!");
      } else {
        toast.error("Falha ao atualizar as informações.");
      }
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      toast.error("Erro ao atualizar os dados.");
    }
  };

  return (
    <div className="p-6 space-y-4 dark:zinc-900">
      <div className="flex flex-col rounded-xl w-full 2xl:w-[1000px] gap-10">
        <h3 className="text-2xl font-bold">{t("companyInformation")}</h3>
        <InputGroup
          label={t("legalName")}
          desc={t("changeLegal")}
          value={companyInfo.legalName}
          onChange={(val) => handleCompanyInfoChange("legalName", val)}
        />
        <InputGroup
          label={t("shortName")}
          desc={t("changeShort")}
          value={companyInfo.shortName}
          onChange={(val) => handleCompanyInfoChange("shortName", val)}
        />
        <InputGroup
          label={t("taxId")}
          desc={t("changeTax")}
          value={companyInfo.taxId}
          onChange={(val) => handleCompanyInfoChange("taxId", val)}
        />
        <hr />
        <h3 className="text-2xl font-bold">{t("contactDetails")}</h3>
        <InputGroup
          label={t("accountManager")}
          desc={t("changeAccount")}
          value={contactDetails.accountManager}
          onChange={(val) => handleContactDetailsChange("accountManager", val)}
        />
        <InputGroup
          label={t("generalEmail")}
          desc={t("changeGeneral")}
          value={contactDetails.generalEmail}
          onChange={(val) => handleContactDetailsChange("generalEmail", val)}
        />
        <InputGroup
          label={t("phoneNumber")}
          desc={t("changePhone")}
          value={contactDetails.phoneNumber}
          onChange={(val) => handleContactDetailsChange("phoneNumber", val)}
        />
        <InputGroup
          label={t("supportTechnical")}
          desc={t("changeSupportTechnical")}
          value={contactDetails.supportTechnical}
          onChange={(val) => handleContactDetailsChange("supportTechnical", val)}
        />
        <InputGroup
          label={t("supportEmail")}
          desc={t("changeSupportEmail")}
          value={contactDetails.supportEmail}
          onChange={(val) => handleContactDetailsChange("supportEmail", val)}
        />
        <InputGroup
          label={t("phoneNumberSupportTechnical")}
          desc={t("changePhoneNumberSupportTechnical")}
          value={contactDetails.phoneNumberSupportTechnical}
          onChange={(val) =>
            handleContactDetailsChange("phoneNumberSupportTechnical", val)
          }
        />
        <hr />
        <h3 className="text-2xl font-bold">{t("addressDetails")}</h3>
        <CountrySelect
          defaultValue={companyInfo.country}
          onChange={(val) => handleCompanyInfoChange("country", val)}
        />
        <CitySelect
          defaultValue={companyInfo.city}
          onChange={(val) => handleCompanyInfoChange("city", val)}
        />
        <TimezoneSelect
          defaultValue={companyInfo.timeZone}
          onChange={(val) => handleCompanyInfoChange("timeZone", val)}
        />
        <div className="pt-10">
          <Button onClick={handleUpdate}>{t("update")}</Button>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, desc, value, onChange }) {
  return (
    <div className="flex justify-between w-[700px]">
      <div className="w-52">
        <h4 className="font-semibold">{label}</h4>
        <p className="text-xs">{desc}</p>
      </div>
      <Input
        className="w-96"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
