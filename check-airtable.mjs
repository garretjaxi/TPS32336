import { fetchAirtableListings } from "./server/airtable.ts";

try {
  const listings = await fetchAirtableListings();
  console.log('First 3 listings from Airtable:');
  listings.slice(0, 3).forEach(listing => {
    console.log(`\n${listing.fields.Name || listing.fields.name}:`);
    console.log('  Distance to Magic Kingdom (mins):', listing.fields["Distance to Magic Kingdom (mins)"]);
    console.log('  Distance to Universal Studios (mins):', listing.fields["Distance to Universal Studios (mins)"]);
    console.log('  All distance fields:', {
      mk: listing.fields["Distance to Magic Kingdom (mins)"],
      universal: listing.fields["Distance to Universal Studios (mins)"],
      seaworld: listing.fields["Distance to SeaWorld (mins)"],
      legoland: listing.fields["Distance to LEGOLAND (mins)"],
      airport: listing.fields["Distance to Orlando Airport (mins)"]
    });
  });
} catch (error) {
  console.error('Error:', error.message);
}
