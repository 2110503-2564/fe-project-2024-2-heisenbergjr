import userLogIn from "@/libs/userLogIn";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:AuthOptions = {
    providers: [
        //authentication provide, use credentails provider
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text", placeholder: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              if (!credentials) return null;
              const user = await userLogIn(credentials.email, credentials.password)
        
              if (user) {
                return user
              } else {
                return null
              }
            }
          })
    ],
    session: {strategy:"jwt"},
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
        },
        async session({session,token,user}) {
          session.user = {
              _id: token.id as string,
              name: token.name as string,
              email: token.email as string,
              token: token.token as string,
              role: token.role as string,
          };
          return session;
        },
        async redirect({ url, baseUrl }) {
          if (url.startsWith(baseUrl) || url === "/") {
              return url;
          }
          if (url.includes("/signout")) {
              return baseUrl;
          }
          return "/reservations/manage"; 
      }
    }
}