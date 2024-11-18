import { Person } from "../../type";

interface PersonDetailsProps {
    person: Person
}


export default function AddressVerification({person}:PersonDetailsProps) {
    return(
        <div>
            Address Verification
        </div>
    )
}