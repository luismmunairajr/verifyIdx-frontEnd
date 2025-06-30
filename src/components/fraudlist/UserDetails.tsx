import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import Image from "next/image";
import { Profile } from "./dataTable";
import { TriangleAlert, User, Calendar } from "lucide-react";

type HandleCloseModal = () => void;
type HandleViewClick = (profile: Profile) => void;

export default function UserDetails({profile, handleCloseModal, handleViewClick}: {profile: Profile, handleCloseModal: HandleCloseModal, handleViewClick: HandleViewClick}) {
    const personalDetails = [
        { label: "BI", value: profile.person.details.bi },
        { label: "Marital Status", value: profile.person.details.maritalStatus },
        { label: "Address", value: profile.person.details.address },
        { label: "Date of Birth", value: profile.person.details.dateOfBirth },
    ]
    return (
        <Dialog onOpenChange={handleCloseModal} open={!!profile}>
            <DialogContent className="max-w-3xl max-h-[100vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex flex-col space-y-4">
                        <span className="flex space-x-2">
                            <TriangleAlert className="text-red-500" width={30} height={30}/>
                            <span className="font-semibold text-xl">User Details</span>
                        </span>
                        <span className="text-sm text-muted-foreground">Detected on: {profile.date}</span>
                    </DialogTitle>
                    <DialogDescription className="overflow-y-auto flex flex-col space-y-4">
                        <span className="flex space-x-2 items-center">
                            <Image src={profile.person.image.src} alt={profile.person.name} width={50} height={50}/>
                            <span className="text-xl">{profile.person.name}</span>
                        </span>
                        <span className="border-slate-300 border-solid rounded-[10px] p-4 h-auto flex flex-col space-y-2 ring-1 ring-muted">
                            <span className="flex space-x-2 items-center">
                                <User width={30} height={30}/>
                                <span className="font-semi-bold">Personal Data</span>
                            </span>
                            { personalDetails.map((detail, index: number) => {
                                return (
                                    <span className = "flex justify-between" key={index}> 
                                        <span className="text-muted-foreground">{detail.label}: </span>
                                        <span>{detail.value}</span>
                                    </span>
                                )
                            })}
                        </span>
                        <span className="dark:bg-red-950/10 ring-1 bg-red-50 ring-red-200 rounded-md p-4 grid grid-rows-3 space-y-2 h-60 ">
                            <span className="flex space-x-2 items-center">
                                <TriangleAlert width={20} height={20} className="text-red-500"/>
                                <span className="font-bold">Detection Reason</span>
                            </span>
                            <span>{profile.reason}</span>
                            <span className="bg-muted flex rounded-md items-center space-x-1 p-3">
                                <Calendar width={20} height={20}/>
                                <span> Detected on: {profile.date}</span>
                            </span>
                        </span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
} 