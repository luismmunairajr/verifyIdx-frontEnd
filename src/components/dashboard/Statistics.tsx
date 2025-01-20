import { Eye, User, Drama, ShieldAlert} from "lucide-react"
import StatisticCard from "./StatisticCard"
export default function Statistics() {
    return (
        <div className="w-full flex space-x-10 h-32 ">
            <StatisticCard title="Approved" number={24} icon={<Eye strokeWidth={1} className="dark:text-white" />} variance={-25} />
            <StatisticCard title="Denied" number={64} icon={<User strokeWidth={1} className="dark:text-white"/>} variance={+50} />
            <StatisticCard title="Pending" number={57} icon={<Drama strokeWidth={1} className="dark:text-white" />} variance={+3} />
            <StatisticCard title="Total" number={36} icon={<ShieldAlert strokeWidth={1} className="dark:text-white"/>} variance={-15} />
        </div>
    )
}