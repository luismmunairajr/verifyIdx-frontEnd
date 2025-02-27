export default function Badges({ person }) {
  return (
    <div className="w-full flex space-x-2 justify-center 2xl:justify-start 2xl:pl-20 text-neutral-100 text-sm">
      {person.auditTrailImage && (<div className="bg-blue-500 p-2 rounded-lg">Liveness verified</div>)}

      {person.categories === "PEP" && (<div className="bg-red-500 p-2 rounded-lg">PEP</div>
      )}
      {person.fullName != "N/A" && (<div className="bg-green-500 p-2 rounded-lg">Document Scan</div>)}
    </div>
  );
}
