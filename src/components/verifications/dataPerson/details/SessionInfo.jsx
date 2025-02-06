import DetailField from "@/components/verifications/dataPerson/DetailField.jsx";

export default function SessionInfo({ person }) {
    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <DetailField label="Workflow ID" value={person.workflowId} />
                <DetailField label="Verification ID" value={person.verificationId} />
                <DetailField label="Platform" value={person.platform} />
            </div>
            <div className="space-y-6">
                <DetailField label="Device Model" value={person.deviceModel} />
                <DetailField label="User Agent" value={person.userAgent} />
            </div>
            <div className="space-y-6">
                <DetailField label="IP Address" value={person.ipAddress} />
                <DetailField label="Started At" value={person.startedAt} />
            </div>
        </div>
    )
}