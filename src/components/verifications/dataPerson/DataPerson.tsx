import Resume from "./Resume";
import PersonDetails from "./details/PersonDetails";
import ThirdPartVerification from "./details/ThirdPartVerification";
import SanctionScreening from "./details/SanctionScreening";
import AddressVerification from "./details/AddressVerification";
import OtherInfo from "./details/OtherInfo";
import SessionInfo from "./details/SessionInfo";
import { Person } from "../type";
import { useState } from "react";

interface DataPersonProps {
    selectedPerson: Person | null;
}

export default function DataPerson({ selectedPerson }: DataPersonProps) {
        const [activeTab, setActiveTab] = useState("Person Details");

    const renderContent = () => {
        if (!selectedPerson) {
            return <div>Select a person to see the details</div>;
        }

        switch (activeTab) {
            case "Person Details":
                return <PersonDetails person={selectedPerson} />;
            case "Third-Party Verification":
                return <ThirdPartVerification person={selectedPerson}/>;
            case "Sanction Screening":
                return <SanctionScreening person={selectedPerson}/>;
            case "Address Verification":
                return <AddressVerification person={selectedPerson}/>;
            case "Other Info":
                return <OtherInfo person={selectedPerson}/>;
            case "Session Info":
                return <SessionInfo person={selectedPerson}/>;
            default:
                return <PersonDetails person={selectedPerson} />;
        }
    };

    const details = [
        "Person Details",
        "Third-Party Verification",
        "Sanction Screening",
        "Address Verification",
        "Other Info",
        "Session Info",
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
                                {option}
                            </p>
                        ))}
                    </div>
                    <div>
                        <hr/>
                        {renderContent()}
                    </div>
                </>
            ) : (
                <div className="w-full h-full flex mt-52 items-center justify-center  dark:text-white">
                    <p>Select a person to see the details</p>
                </div>
            )}
        </div>
    );
}
