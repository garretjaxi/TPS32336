/*
   PropertyView — Houfy Listing Viewer Page
   Displays Houfy listing in iframe with back button
   ============================================================= */
import { useSearchParams } from "wouter";
import PropertyViewer from "@/components/PropertyViewer";
import NotFound from "./NotFound";

export default function PropertyView() {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const name = searchParams.get("name") || "Property Listing";

  if (!url) {
    return <NotFound />;
  }

  return <PropertyViewer url={url} propertyName={name} />;
}
