export default function Badges() {
    return (
        <div className="w-full flex space-x-2 items-center justify-center text-neutral-100 text-sm">
            <div className="bg-blue-500 p-2 rounded-lg">
                Liveness verified
            </div>

            <div className="bg-red-500 p-2 rounded-lg">
                PEP
            </div>

            <div className="bg-green-500 p-2 rounded-lg">
                Government Info Match
            </div>

            <div className="bg-green-700 p-2 rounded-lg">
                Verified Tax ID
            </div>
            <div className="bg-red-700 p-2 rounded-lg">
                Invalid Address
            </div>
        </div>
    )
}