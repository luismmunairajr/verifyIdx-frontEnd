"use client";

export default function VerificationSkeleton() {
  return (
    <div className="p-4 max-w-3xl mx-auto animate-pulse space-y-4">
    
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full bg-gray-300" /> 
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-300 rounded w-1/2" /> 
          <div className="h-4 bg-gray-300 rounded w-1/3" />
          <div className="h-4 bg-gray-300 rounded w-1/4" /> 
        </div>
      </div>

      
      <div className="flex space-x-2">
        <div className="h-6 w-32 bg-gray-300 rounded" />
        <div className="h-6 w-32 bg-gray-300 rounded" />
      </div>

     
      <div className="flex space-x-4 mt-4">
        <div className="h-6 w-24 bg-gray-300 rounded" />
        <div className="h-6 w-32 bg-gray-300 rounded" />
        <div className="h-6 w-36 bg-gray-300 rounded" />
        <div className="h-6 w-40 bg-gray-300 rounded" />
      </div>

     
      <div className="grid grid-cols-2 gap-4 mt-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2" /> 
              <div className="h-5 bg-gray-300 rounded w-full" /> 
            </div>
          ))}
      </div>
    </div>
  );
}
