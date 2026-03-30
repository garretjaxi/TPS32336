import { syncAirtableListings } from './server/airtable.ts';

async function sync() {
  try {
    console.log('Starting Airtable sync...');
    const result = await syncAirtableListings();
    console.log(`✅ Synced ${result.synced} listings`);
    if (result.errors > 0) {
      console.log(`⚠️ ${result.errors} errors occurred`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

sync();
