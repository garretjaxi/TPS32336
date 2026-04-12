/*
   PropertyViewer — Houfy Listing Iframe Wrapper
   Displays Houfy listings in an iframe with back button
   ============================================================= */
import { ArrowLeft } from "lucide-react";


interface PropertyViewerProps {
  url: string;
  propertyName?: string;
}

export default function PropertyViewer({ url, propertyName = "Property" }: PropertyViewerProps) {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-[oklch(0.18_0.012_55)] to-[oklch(0.22_0.015_50)] text-white p-4 flex items-center gap-3 shadow-lg">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Go back to listings"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Back</span>
        </button>
        <h1 className="text-lg font-semibold flex-1">{propertyName}</h1>
      </div>

      {/* Iframe container */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={url}
          title={`${propertyName} - Houfy Listing`}
          className="w-full h-full border-0"
          allow="payment"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
}
