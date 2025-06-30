import { Person } from "../../type";

interface PersonDetailsProps {
    person: Person
}

export default function ThirdPartVerification({person}:PersonDetailsProps) {
    return(
        <div>
            Third-Party Verification
        </div>
    )
}