import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoClientPromise from "./service/mongoClientPromise";
import bcrypt from "bcryptjs";
import { userModel } from "./models/user-model";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  session: {
    strategy: "jwt",
  },

  providers: [
    // credentials loin
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, request) {
        if (!credentials) return null;

        const email =
          typeof credentials.email === "string" ? credentials.email : "";
        const password =
          typeof credentials.password === "string" ? credentials.password : "";

        if (!email || !password) return null;

        const user = await userModel.findOne({ email }).lean();
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Email or password mismatch");

        const { password: _pass, _id, ...userWithoutPassword } = user;
        return {
          ...userWithoutPassword,
          id: _id.toString(),
        };
      },
    }),

    // google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  //  role in session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? "user"; // default role
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
  debug: true,
});
