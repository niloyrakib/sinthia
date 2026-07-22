// scripts/seed.ts
// One-time script to push scripts/seed-data.ts into Firestore.
//
// Setup:
//   1. Firebase Console → Project Settings → Service Accounts → Generate new private key
//   2. Save it as service-account.json in the project root (already .gitignored)
//   3. npm install -D firebase-admin tsx
//   4. npx tsx scripts/seed.ts
//
// Safe to re-run: it upserts by slug instead of duplicating documents.

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { categories, tags, games, tools, posts } from "./seed-data";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("../service-account.json");

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

async function upsertBySlug(collectionName: string, records: { slug: string }[]) {
  const col = db.collection(collectionName);
  for (const record of records) {
    const existing = await col.where("slug", "==", record.slug).limit(1).get();
    if (existing.empty) {
      await col.add(record);
      console.log(`+ ${collectionName}/${record.slug}`);
    } else {
      await existing.docs[0].ref.set(record, { merge: true });
      console.log(`~ ${collectionName}/${record.slug}`);
    }
  }
}

async function main() {
  await upsertBySlug("categories", categories);
  await upsertBySlug("tags", tags);
  await upsertBySlug("games", games);
  await upsertBySlug("tools", tools);
  await upsertBySlug("posts", posts);
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
