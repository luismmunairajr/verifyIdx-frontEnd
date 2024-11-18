interface ToolbarProps{
  onClick?: () => void
}

export function IdentityVerification({onClick}: ToolbarProps) {
  return (
    <div className="p-2 flex flex-col space-y-2">
      <h3 className="font-semibold">Identity Verification</h3>
      <p className="text-sm">Identity verification ensures the authenticity of an individual's identity, using biometric data and secure documentation checks to prevent fraud and enhance security.</p>
      <div>
        <div className="space-x-2 flex">
          <span className="font-semibold">Liveness Verification</span>
          <input type="checkbox" name="" id="" />
        </div>
        <p className="text-xs">Confirms identity using biometric and document checks to prevent fraud.</p>
      </div>
      <div>
        <div className="space-x-2 flex">
          <span className="font-semibold">Document Verification</span>
          <input type="checkbox" name="" id="" />
        </div>
        <p className="text-xs">Confirms identity using biometric and document checks to prevent fraud.</p>
      </div>
      <div>
        <div className="space-x-2 flex">
          <span className="font-semibold">Face Match</span>
          <input type="checkbox" name="" id="" />
        </div>
        <p className="text-xs">Confirms identity using biometric and document checks to prevent fraud.</p>
      </div>
      <div>
        <button className="bg-blue-500 px-5 py-1 hover:bg-blue-800 text-white rounded text-sm" onClick={onClick}>Insert</button>
      </div>
    </div>
  );
}