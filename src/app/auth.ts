import { client } from "@/sanity/lib/client";
import { AUTHOR_QUERY_BY_ID } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { id, name, email, image }, profile }) {
      const existingUser = await client.fetch(AUTHOR_QUERY_BY_ID, { id: profile?.sub || id });
      if (existingUser) {
        return true;
      }
      console.log(id, "existingUser", profile);
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.sub || id,
          name,
          email,
          image,
          username: email?.split("@")[0] || "",
        });
      }
      return true;
    },
    async jwt({ token, account }) {
      if (token) {
        console.log(token, "token", account);
        const user = await client.fetch(AUTHOR_QUERY_BY_ID, {
          id: token?.sub,
        });
        console.log(user, "user");
        
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log(token,'token');
      
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
