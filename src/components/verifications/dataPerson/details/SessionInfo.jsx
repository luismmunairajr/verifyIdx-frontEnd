import DetailField from "@/components/verifications/dataPerson/DetailField.jsx"; 
import { useLanguage } from "@/components/language/language-provider";
import { useGeoIP } from "@/hooks/useGeoIP.jsx";

export default function SessionInfo({ person }) {
    const { t } = useLanguage();
    const geo = useGeoIP(person.ipAddress);

    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <DetailField label={t("platform")} value={person.platform} />
                <DetailField label={t("appId")} value={person.appID} />
                <DetailField label={t("userAgent")} value={person.userAgent} />
            </div>
            <div className="space-y-6">
                <DetailField label={t("deviceModel")} value={person.deviceModel} />
                <DetailField label={t("deviceSDKVersion")} value={person.deviceSDKVersion} />
            </div>
            <div className="space-y-6">
                <DetailField
          label={t("ipAddress")}
          value={
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <span>{person.ipAddress}</span>
                {geo && (
                  <>
                      <img
                      src={`https://flagcdn.com/24x18/${geo?.country_code?.toLowerCase?.() || "xx"}.png`}
                      alt={geo?.country_name || "Unknown Country"}
                      className="w-6 h-4 object-cover"
                    />
                    <span>{geo.country_name}</span>
                    {geo.region && (
                      <span className="text-gray-500 text-xs">({geo.region})</span>
                    )}
                  </>
                )}
              </div>
            </div>
          }
        />

                <DetailField label={t("startedAt")} value={person.startedAt} />

                
            </div>
        </div>
    );
}
