import userLogIn from "@/libs/userLogIn";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ✅ Define a custom user type
interface CustomUser extends User {
  _id: string;
  token: string;
  role: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req): Promise<CustomUser | null> {
        if (!credentials) return null;

        const user = await userLogIn(credentials.email, credentials.password);

        if (user) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: user.token, // ✅ Ensure token is included
            role: user.role,
          } as CustomUser;
        } else {
          return null;
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        return {
          ...token,
          id: customUser._id,
          name: customUser.name,
          email: customUser.email,
          token: customUser.token, // ✅ Ensure token is stored
          role: customUser.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("JWT Token in session callback:", token); // 🔍 Debugging

      session.user = {
        _id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        token: token.token as string, // ✅ Ensure session gets token
        role: token.role as string,
      };
      return session;
    }
  }
};
