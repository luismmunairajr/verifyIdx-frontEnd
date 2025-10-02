import Resume from "./Resume.jsx";
import PersonDetails from "./details/PersonDetails.jsx";
import AddressVerification from "./details/AddressVerification.jsx";
import OtherInfo from "./details/OtherInfo.jsx";
import SessionInfo from "./details/SessionInfo.jsx";
import { useState } from "react";
import { useLanguage } from "@/components/language/language-provider";
import VerificationSkeleton from "../listPerson/VerificationSkeleton.jsx";

export default function DataPerson({ selectedPerson }) {
        const [activeTab, setActiveTab] = useState("personDetails");
        const { t } = useLanguage();
        const renderContent = () => {
            if (!selectedPerson) {
            return <div>{t("selectPersonToSeeDetails")}</div>;
        }

        switch (activeTab) {
            case "personDetails":
                return <PersonDetails person={selectedPerson} />;
           {/*     case "thirdPartyReference":
                return <ThirdPartVerification person={selectedPerson} />;
            case "sanctionScreening":
                return <SanctionScreening person={selectedPerson} />; */}
            case "addressVerification":
                return <AddressVerification person={selectedPerson}/>;
            case "otherInfo":
                return <OtherInfo person={selectedPerson}/>;
            case "sessionInfo":
                return <SessionInfo person={selectedPerson}/>;
            default:
                return <PersonDetails person={selectedPerson} />;
        }
    };

  const details = [
    "personDetails",
    "addressVerification",
    "otherInfo",
    "sessionInfo",
  ];

 return (
        <div className="flex-1 w-full flex-col flex p-4 space-y-10 overflow-y-auto">
            {selectedPerson ? (
                <>
                    <Resume person={selectedPerson} />
                    <div className="w-full flex text-sm text-zinc-500 items-center justify-around 2xl:justify-start 2xl:pl-10 2xl:space-x-14">
                        {details.map((option) => (
                            <p
                                key={option}
                                className={`cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 ${activeTab === option ? "font-semibold text-black dark:text-white" : ""
                                    }`}
                                onClick={() => setActiveTab(option)}
                            >
                                {t(option)}
                            </p>
                        ))}
                    </div>
                    <div>
                        <hr/>
                        {renderContent()}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex mt-52 items-center justify-center dark:text-white">
          <p>{t("selectedPerson")}</p>
        </div>
      )}
    </div>
  );
}
