import { Handle, NodeProps, Position } from "@xyflow/react";
import clsx from "clsx"; 

export default function Square(props: NodeProps) {
    const { label, icon: Icon }:any = props.data;

    const containerClass = clsx(
        "border rounded-xl w-36 h-36 relative flex flex-col items-center justify-center p-4 space-y-2",
        {
            "bg-blue-100 border-blue-500 text-blue-700": label === "Identity Verification",
            "bg-green-100 border-green-500 text-green-700": label === "AI Assistant",
            "bg-yellow-100 border-yellow-500 text-yellow-700": label === "Digital Signature",
            "bg-red-100 border-red-500 text-red-700": label === "Watchlist",
            "bg-gray-100 border-gray-500 text-gray-700": !label,
        }
    );

    return (
        <div className={containerClass}>
            {Icon && <Icon className="size-8" />}
            {label && <span className="text-center text-sm font-medium">{label}</span>}
            <Handle
                id="right"
                type="source"
                position={Position.Right}
            />
            <Handle
                id="left"
                type="target"
                position={Position.Left}
            />
            <Handle
                id="top"
                type="target"
                position={Position.Top}
            />
            <Handle
                id="bottom"
                type="source"
                position={Position.Bottom}
            />
        </div>
    );
}
