export default function CustomNode({data}) {
    return (
        <div className="relative p-4 bg-white border rounded shadow-md">
            <div className="absolute top-0 left-0 w-4 h-4 bg-blue-500" style={{ top: '-5px', left: '50%' }} /> {/* Handle top */}
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-blue-500" style={{ bottom: '-5px', left: '50%' }} /> {/* Handle bottom */}
            <div className="absolute top-0 left-0 w-4 h-4 bg-blue-500" style={{ top: '50%', left: '-5px' }} /> {/* Handle left */}
            <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500" style={{ top: '50%', right: '-5px' }} /> {/* Handle right */}
            {data.label}
        </div>
    )
}