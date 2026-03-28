export default function LoadingDisplay() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-gray-700">Theme Park Stays</p>
        <p className="text-sm text-gray-500 mt-1">Loading your vacation experience...</p>
      </div>
    </div>
  );
}
