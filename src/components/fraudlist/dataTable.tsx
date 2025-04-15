import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";
import {Button} from "@/components/ui/button"
import { useLanguage } from "@/components/language/language-provider";

interface Profile {
  name: string;
  image: string;
  status:string
  details: {
    address: string;
    dateOfBirth: string;
    sex: string;
  };
}

interface DataTableProps {
  profiles: Profile[];
}

export default function DataTable({ profiles }: DataTableProps) {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleViewClick = (profile: Profile) => {
    setSelectedProfile(profile);
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
                  src={profile.image}
                  alt="foto"
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>{profile.name}</TableCell>
              <TableCell>{profile.details.address}</TableCell>
              <TableCell>{profile.details.dateOfBirth}</TableCell>
              <TableCell>{profile.details.sex}</TableCell>
              <TableCell>{profile.status}</TableCell>
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
        <Dialog open={!!selectedProfile} onOpenChange={handleCloseModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("profilesDetails")}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <Image
                src={selectedProfile.image}
                alt={selectedProfile.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <p className="text-lg font-semibold mt-2">{selectedProfile.name}</p>
              <p>{t("address")}: {selectedProfile.details.address}</p>
              <p>{t("dateOfBirth")}: {selectedProfile.details.dateOfBirth}</p>
              <p>{t("sex")}: {selectedProfile.details.sex}</p>
            </div>
            <DialogFooter>
              <Button onClick={handleCloseModal}>{t("close")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
