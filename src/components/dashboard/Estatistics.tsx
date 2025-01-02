import { Eye, User, Drama, ShieldAlert} from "lucide-react"
import EstatistiCard from "./EstatistiCard"
export default function Estatistics() {
    return (
        <div className="w-full flex space-x-10 h-32 ">
            <EstatistiCard title="Today's verification" number={24} icon={<Eye strokeWidth={1} className="dark:text-white" />} variance={-25} />
            <EstatistiCard title="Today's user" number={64} icon={<User strokeWidth={1} className="dark:text-white"/>} variance={+50} />
            <EstatistiCard title="Today's fraudlist" number={57} icon={<Drama strokeWidth={1} className="dark:text-white" />} variance={+3} />
            <EstatistiCard title="Total Fraudflag" number={36} icon={<ShieldAlert strokeWidth={1} className="dark:text-white"/>} variance={-15} />
        </div>
    )
}