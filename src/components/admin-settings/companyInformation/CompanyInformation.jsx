import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CompanyInformation() {
  return (
    <div className="p-6 space-y-4 dark:zinc-900">
      <div className="flex flex-col rounded-xl w-full 2xl:w-[1000px] gap-10">
        <h3 className="text-2xl font-bold">Company Information</h3>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">Legal Name</h4>
            <p className="text-xs">Change your legal name</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder="Legal Name"
            defaultValue="Bluestring Consulting Ltd"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">Short Name</h4>
            <p className="text-xs">Change your short name</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder="Short Name"
            defaultValue="Bluestring"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">Tax ID</h4>
            <p className="text-xs">Change your tax id</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder="Tax ID"
            defaultValue="3697173981793"
          />
        </div>
        <hr />
        <h3 className="text-2xl font-bold">Contact Details</h3>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">Account Manager</h4>
            <p className="text-xs">Change your account manager</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder="Account Manager"
            defaultValue="Samuel Nhantumbo"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">General Email</h4>
            <p className="text-xs">Change your general email</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder="General Email"
            defaultValue="samuelnhantumbo@gmail.com"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">Phone Number</h4>
            <p className="text-xs">Change your phone number</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder="Phone Number"
            defaultValue="831841451"
          />
        </div>
        <hr />
        <h3 className="text-2xl font-bold">Address Details</h3>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">Country</h4>
            <p className="text-xs">Change your country</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder="Country"
            defaultValue="Mozambique"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">City</h4>
            <p className="text-xs">Change your city</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder="City"
            defaultValue="Maputo"
          />
        </div>
        <div className="flex justify-between w-[700px]">
          <div className="w-52">
            <h4 className="font-semibold">Time Zone</h4>
            <p className="text-xs">Change your time zone</p>
          </div>
          <Input
            className="w-96"
            type="text"
            placeholder="Time Zone"
            defaultValue="GMT+2"
          />
        </div>
        <div className="pt-10">
          <Button>Update</Button>
        </div>
      </div>
    </div>
  );
}
