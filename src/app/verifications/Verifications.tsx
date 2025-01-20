'use client'
import DataPerson from "@/components/verifications/dataPerson/DataPerson";
import ListPerson from "@/components/verifications/listPerson/ListPerson";
import { useState } from "react";
import { Person } from "@/components/data/type";
import { Header } from "@/components/header";
import axiosInstance from "@/app/api/axios/axiosInstance"

export default function Verifications() {

    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    return (
        <div className="w-full h-screen text-black flex">
            <ListPerson onSelectPerson={setSelectedPerson} />
            <div className="w-full overflow-y-auto">
                <Header/>
                <DataPerson selectedPerson={selectedPerson}/>
            </div>   
        </div>
    );
}
