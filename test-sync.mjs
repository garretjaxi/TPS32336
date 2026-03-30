import { syncAirtableListings, fetchAirtableListings } from './server/airtable.ts';

console.log('Fetching Airtable listings...');
try {
  const listings = await fetchAirtableListings();
  console.log(`Found ${listings.length} listings in Airtable`);
  
  if (listings.length > 0) {
    console.log('\nFirst listing:');
    console.log(JSON.stringify(listings[0], null, 2));
  }
  
  console.log('\nStarting sync...');
  const result = await syncAirtableListings();
  console.log(`Sync complete: ${result.synced} synced, ${result.errors} errors`);
} catch (error) {
  console.error('Error:', error.message);
}
