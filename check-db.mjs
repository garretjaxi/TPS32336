import { getDb } from "./server/db.ts";
import { listings } from "./drizzle/schema.ts";

const db = await getDb();
const result = await db.select().from(listings).limit(1);
const first = result[0];

console.log('First listing in DB:');
console.log('Name:', first.name);
console.log('Image:', first.image);
console.log('distanceMagicKingdom:', first.distanceMagicKingdom);
console.log('distanceUniversal:', first.distanceUniversal);
