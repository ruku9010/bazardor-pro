import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const connectionString =
  process.env.MONGODB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error(
    "MONGODB_CONNECTION_STRING is not configured"
  );
}

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING as string);
const db = client.db("bazardor-pro");



export const auth = betterAuth({
  account: {
		accountLinking: {
			trustedProviders: ["github", "google"], // Add your provider(s)
		},
	},
  session: {
        deferSessionRefresh: true
    },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }

  },
  database: mongodbAdapter(db, {
    client,
  }),
});
