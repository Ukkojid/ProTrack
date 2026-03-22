export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        
        <p className="text-gray-700 font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
}


// export default function Loading() {
//   return (
//     <div className="p-6 space-y-4">
//       <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"></div>
//       <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
//       <div className="h-64 w-full bg-gray-200 animate-pulse rounded"></div>
//     </div>
//   );
// }

