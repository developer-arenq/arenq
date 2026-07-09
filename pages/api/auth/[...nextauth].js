import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import main from "../../../database/conn";
import User from "../../../models/userSchema";
import generateToken from "../../../utils/generateToken";

export const authOptions = {
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await main();

        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) return null;

        const user = await response.json();
        if (!user.token) {
          console.error("❌ Login API did not return token");
          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Credentials Login
      if (user?._id) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.fullname;
        token.accessToken = user.token; 
      }

      // Google Login
      if (account?.provider === "google") {
        await main();

        let dbUser = await User.findOne({ email: profile.email });
        if (!dbUser) {
          dbUser = await User.create({
            fullname: profile.name,
            email: profile.email,
            provider: "google",
            image: profile.picture
          });
        }

        token.id = dbUser._id;
        token.email = dbUser.email;
        token.name = dbUser.fullname;
        token.picture = dbUser.image;

        // Generate server JWT for Google users
        token.accessToken = generateToken(dbUser._id);
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture ?? null;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default function handler(req, res) {
  return NextAuth(req, res, authOptions);
}
