'use client'
import DataPerson from "../../components/fraudflag/dataPerson/DataPerson";
import ListPerson from "../../components/fraudflag/listPerson/ListPerson";
import { useState } from "react";
import { Person } from "../../components/fraudflag/type";
import { Header } from "@/components/header";


export default function Fraudflag() {
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    return (
        <div className="w-full h-screen flex">
            <ListPerson onSelectPerson={setSelectedPerson} />
            <div className="w-full overflow-y-auto">
                <Header/>
                <DataPerson selectedPerson={selectedPerson}/>
            </div>   
        </div>
    );
}
