'use client';
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
// import { profiles } from "@/components/fraudlist/profile";
import DataTable from "@/components/fraudlist/dataTable";
import { useLanguage } from "@/components/language/language-provider";
import { fraudService } from "@/services/fraudService";


interface Profile {
  person: {
    name: string,
    status:string,
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    }
    details: {
      address: string;
      dateOfBirth: string;
      sex: string;
    },
  }

}
export default function Fraudlist() {
  const { t } = useLanguage()
  const [profiles, setProfiles] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fraudService.getFrauds()
        console.log("Fetched profiles:", response);
        setProfiles(response);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, [])

  const filteredProfiles = profiles.filter((profile: Profile) => {
    if (!profile || !profile.person) {
      console.warn("Profile is undefined or null:", profile);
      return;
  }
    return profile.person.name.toLowerCase().includes(filter.toLowerCase())
});

  console.log("Filtered profiles:", filteredProfiles);
  return (
    <div className="w-full h-screen flex flex-col p-6 gap-4">
      <Input
        placeholder={t("searchName")}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"/>
      <DataTable profiles={filteredProfiles} />
    </div>
  );
}
