import {
  IconBrandAndroid,
  IconBrandApple,
  IconBrandChrome,
  IconBrandFirefox,
  IconBrandSafari,
  IconBrowser,
  IconQuestionMark,
  IconWorld, 
} from "@tabler/icons-react";
import DetailField from "@/components/verifications/dataPerson/DetailField.jsx";
import { useLanguage } from "@/components/language/language-provider";
import { useGeoIP } from "@/hooks/useGeoIP.jsx";

function getPlatformIcon(platform = "") {
  const lower = platform.toLowerCase();
  if (lower.includes("android")) return <IconBrandAndroid size={18} className="text-green-600" />;
  if (lower.includes("ios") || lower.includes("apple")) return <IconBrandApple size={18} className="text-black" />;
  if (lower.includes("web")) return <IconWorld size={18} className="text-blue-500" />; // <- GLOBO para Web
  return <IconQuestionMark size={18} />;
}

function getUserAgentInfo(userAgent = "") {
  if (!userAgent) return { name: "Desconhecido", icon: <IconQuestionMark size={18} /> };

  if (userAgent.includes("|")) {
    const short = userAgent.split("|").slice(0, 4).join("|") + "|...";
    const isAndroid = userAgent.toLowerCase().includes("android");
    const isIOS = userAgent.toLowerCase().includes("ios");
    return {
      name: short,
      icon: isAndroid
        ? <IconBrandAndroid size={18} className="text-green-600" />
        : isIOS
        ? <IconBrandApple size={18} className="text-black" />
        : <IconBrowser size={18} />,
    };
  }

  const match = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera|Brave)\/([\d\.]+)/i);
  const osMatch = userAgent.match(/Android|iPhone|iPad|iOS|Windows|Mac OS/i);

  const browser = match?.[1];
  const version = match?.[2];
  const os = osMatch?.[0];

  const browserIcons = {
    Chrome: <IconBrandChrome size={18} className="text-blue-500" />,
    Firefox: <IconBrandFirefox size={18} className="text-orange-500" />,
    Safari: <IconBrandSafari size={18} className="text-gray-600" />,
    Edge: <IconBrowser size={18} className="text-blue-600" />,
    Opera: <IconBrowser size={18} className="text-red-500" />,
    Brave: <IconBrandChrome size={18} className="text-yellow-500" />,
  };

  return {
    name: browser && version ? `${browser}/${version}` : "Navegador desconhecido",
    icon: browserIcons[browser] || <IconBrowser size={18} />,
  };
}


export default function SessionInfo({ person }) {
  const { t } = useLanguage();
  const geo = useGeoIP(person.ipAddress);

  const { icon: platformIcon } = getUserAgentInfo(person.userAgent);
  const platformLabel = person.platform?.charAt(0).toUpperCase() + person.platform?.slice(1);
  const { name: uaName, icon: uaIcon } = getUserAgentInfo(person.userAgent);

  return (
    <div className="p-10 w-full grid grid-cols-3">
      <div className="space-y-6">
        <DetailField
          label={t("platform")}
          value={
            <div className="flex items-center space-x-2">
              {getPlatformIcon(person.platform)}
              <span>{platformLabel}</span>
            </div>
          }
        />

        <DetailField label={t("appId")} value={person.appID} />

        <DetailField
          label={t("userAgent")}
          value={
            <div className="flex items-center space-x-2">
              {uaIcon}
              <span>{uaName}</span>
            </div>
          }
        />
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
              <span>{person.ipAddress}</span>
              {geo && (
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://flagcdn.com/24x18/${geo?.country_code?.toLowerCase?.() || "xx"}.png`}
                    alt={geo?.country_name || "Unknown Country"}
                    className="w-5 h-5 object-cover rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm">{geo.country_name}</span>
                    {geo.region && (
                      <span className="text-gray-500 text-xs">({geo.region})</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          }
        />

        <DetailField label={t("startedAt")} value={person.startedAt} />
      </div>
    </div>
  );
}
