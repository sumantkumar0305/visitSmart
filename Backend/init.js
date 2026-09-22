// One-off script to populate the database with sample places so the
// homepage/frontend has data to display right after setup.
//
// Run it from the Backend folder with:
//   node init.js
// or:
//   npm run seed
//
// Make sure your .env file (with MONGOURL set) is in this same folder
// before running this.

import dotenv from "dotenv";
import mongoose from "mongoose";
import siteSchema from "./Models/SiteData.js";
import sampleSites from "./initData/data.js";

dotenv.config();

const dburl = process.env.MONGOURL;

const seedDB = async () => {
  if (!dburl) {
    console.error(
      "❌ MONGOURL is not set. Add it to your .env file in the Backend folder before running this script."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(dburl);
    console.log("✅ MongoDB Connected Successfully");

    // Clear out any existing sites so re-running this script doesn't
    // keep creating duplicates.
    await siteSchema.deleteMany({});
    console.log("🧹 Cleared existing site data");

    const inserted = await siteSchema.insertMany(sampleSites);
    console.log(`🌱 Inserted ${inserted.length} sample places:`);
    inserted.forEach((site) => console.log(`   - ${site.title} (${site.city}, ${site.state})`));

    console.log("\n✅ Done! Start the server and refresh the frontend to see the data.");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDB();
