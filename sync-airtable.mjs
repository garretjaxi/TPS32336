import { syncAirtableListings } from "./server/airtable.ts";

try {
  const result = await syncAirtableListings();
  console.log('Sync result:', result);
} catch (error) {
  console.error('Sync failed:', error);
}
