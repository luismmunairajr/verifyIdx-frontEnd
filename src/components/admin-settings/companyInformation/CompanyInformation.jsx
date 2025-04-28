import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/language/language-provider";
import { CountrySelect } from "./CountrySelect";
import { CitySelect } from "./CitySelect";
import { TimezoneSelect } from "./TimezoneSelect";

export default function CompanyInformation() {
  const { t } = useLanguage()

  return (
    <div className="p-6 space-y-4 dark:zinc-900">
      <div className="flex flex-col rounded-xl w-full 2xl:w-[1000px] gap-10">
        <h3 className="text-2xl font-bold">{t("companyInformation")}</h3>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("legalName")}</h4>
            <p className="text-xs">{t("changeLegal")}</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder={t("legalName")}
            defaultValue="Bluestring Consulting Ltd"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("shortName")}</h4>
            <p className="text-xs">{t("changeShort")}</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder={t("shortName")}
            defaultValue="Bluestring"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("taxId")}</h4>
            <p className="text-xs">{t("changeTax")}</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder={t("taxId")}
            defaultValue="3697173981793"
          />
        </div>
        <hr />
        <h3 className="text-2xl font-bold">{t("contactDetails")}</h3>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("accountManager")}</h4>
            <p className="text-xs">{t("changeAccount")}</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder={t("accountManager")}
            defaultValue="Samuel Nhantumbo"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("generalEmail")}</h4>
            <p className="text-xs">{t("changeGeneral")}</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder={t("generalEmail")}
            defaultValue="samuelnhantumbo@gmail.com"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("phoneNumber")}</h4>
            <p className="text-xs">{t("changePhone")}</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder={t("phoneNumber")}
            defaultValue="831841451"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("supportTechnical")}</h4>
            <p className="text-xs">{t("changeSupportTechnical")}</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder={t("supportTechnical")}
            defaultValue="Samuel Nhantumbo"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("supportEmail")}</h4>
            <p className="text-xs">{t("changeSupportEmail")}</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder={t("supportEmail")}
            defaultValue="samuelnhantumbo@gmail.com"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("phoneNumberSupportTechnical")}</h4>
            <p className="text-xs">{t("changePhoneNumberSupportTechnical")}</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder={t("generalEmail")}
            defaultValue="8531344144"
          />
        </div>
        <hr />
        <h3 className="text-2xl font-bold">{t("addressDetails")}</h3>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("country")}</h4>
            <p className="text-xs">{t("changeCountry")}</p>
          </div>
          <CountrySelect/>
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("city")}</h4>
            <p className="text-xs">{t("changeCity")}</p>
          </div>
          <CitySelect/>
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">{t("timeZone")}</h4>
            <p className="text-xs">{t("changeTime")}</p>
          </div>
          <TimezoneSelect/>
        </div>
        <div className="pt-10">
          <Button>{t("update")}</Button>
        </div>
      </div>
    </div>
  );
}
