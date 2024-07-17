/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:4VIxNzetib0A@ep-shrill-feather-a5i02yz1.us-east-2.aws.neon.tech/neondb?sslmode=require",
    }
  };