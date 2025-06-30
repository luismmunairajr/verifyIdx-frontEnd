import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";
import {Button} from "@/components/ui/button"
import { useLanguage } from "@/components/language/language-provider";
import UserDetails from "./UserDetails";

export interface Profile {
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
      bi: string;
      maritalStatus: string;
    },
  },
  reason: string;
  date: string;
}

interface DataTableProps {
  profiles: Profile[];
}

export default function DataTable({ profiles }: DataTableProps) {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleViewClick = (profile: Profile) => {
    setSelectedProfile(profile);
    console.log("Selected profile:", profile);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
  };

  const { t } = useLanguage()

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("image")}</TableHead>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("address")}</TableHead>
            <TableHead>{t("dateOfBirth")}</TableHead>
            <TableHead>{t("sex")}</TableHead>
            <TableHead>{t("reason")}</TableHead>
            <TableHead>{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile, index) => (
            <TableRow key={index}>
              <TableCell>
                <Image
                  src={profile.person.image.src}
                  alt="foto"
                  width={profile.person.image.width}
                  height={profile.person.image.height}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>{profile.person.name}</TableCell>
              <TableCell>{profile.person.details.address}</TableCell>
              <TableCell>{profile.person.details.dateOfBirth}</TableCell>
              <TableCell>{profile.person.details.sex}</TableCell>
              <TableCell>{profile.person.status}</TableCell>
              <TableCell>
                <Button onClick={() => handleViewClick(profile)}>{t("view")}</Button>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
      {profiles.length === 0 && (
        <p className="text-center text-gray-500 mt-4">{t("noProfilesFound")}</p>
      )}
      {selectedProfile && (
        <UserDetails
          profile={selectedProfile}
          handleCloseModal={handleCloseModal}
          handleViewClick={() => handleViewClick(selectedProfile)}
        />
      )}
      {/* {selectedProfile && (
        <Dialog open={!!selectedProfile} onOpenChange={handleCloseModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("profilesDetails")}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <Image
                src={selectedProfile.person.image.src}
                alt={selectedProfile.person.name}
                width={selectedProfile.person.image.width}
                height={selectedProfile.person.image.height}
                className="rounded-full"
              />
              <p className="text-lg font-semibold mt-2">{selectedProfile.person.name}</p>
              <p>{t("address")}: {selectedProfile.person.details.address}</p>
              <p>{t("dateOfBirth")}: {selectedProfile.person.details.dateOfBirth}</p>
              <p>{t("sex")}: {selectedProfile.person.details.sex}</p>
            </div>
            <DialogFooter>
              <Button onClick={handleCloseModal}>{t("close")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )} */}
    </div>
  );
}
