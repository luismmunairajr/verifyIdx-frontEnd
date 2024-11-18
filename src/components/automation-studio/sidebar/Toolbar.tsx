import { useState } from "react";
import { ScanEye, Fingerprint, Sparkles, List, ArrowLeft } from "lucide-react";
import NodeDescription from "./NodeDescription";
import { IdentityVerification } from "./submenu/IdentityVerification";
import { DigitalSignature } from "./submenu/DigitalSignature";
import { AiAssistant } from "./submenu/AiAssistant";
import { Watchlist } from "./submenu/Watchlist";

interface ToolbarProps{
  onClick: () => void
}

export default function Toolbar({onClick}: ToolbarProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const nodes = [
    { id: "identity", icon: <ScanEye />, title: "Identity Verification", description: "Confirms identity using biometric and document checks to prevent fraud." },
    { id: "signature", icon: <Fingerprint />, title: "Digital Signature", description: "Authenticates documents securely, ensuring integrity and trust." },
    { id: "assistant", icon: <Sparkles />, title: "AI Assistant", description: "Provides smart insights and recommendations using AI." },
    { id: "watchlist", icon: <List />, title: "Watchlist", description: "Monitors entities in real-time for compliance and risk control." },
  ];


  function renderSubmenu() {
    switch (selectedNode) {
      case "identity":
        return <IdentityVerification onClick={onClick}/>;
      case "signature":
        return <DigitalSignature />;
      case "assistant":
        return <AiAssistant />;
      case "watchlist":
        return <Watchlist />;
      default:
        return null;
    }
  }

  return (
    <div className="right-0 h-full w-[450px] bg-white border flex flex-col p-2 space-y-2">
      {selectedNode === null ? (
        nodes.map((node) => (
          <div key={node.id} onClick={() => setSelectedNode(node.id)}>
            <NodeDescription icon={node.icon} title={node.title} description={node.description} />
          </div>
        ))
      ) : (
        <div className="flex flex-col space-y-4 p-2">
          <button onClick={() => setSelectedNode(null)} className="flex items-center space-x-2 text-blue-500">
            <ArrowLeft /> <span>Back</span>
          </button>
          {renderSubmenu()}
        </div>
      )}
    </div>
  );
}