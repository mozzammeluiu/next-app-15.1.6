import { client } from "@/sanity/lib/client";
import { AUTHOR_QUERY_BY_ID } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_QUERY_BY_ID, { id });
      if (existingUser) {
        return true;
      }
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          email,
          image,
          username: email?.split("@")[0] || "",
        });
      }
      return true;
    },
    async jwt({ token }) {
      if (token) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_QUERY_BY_ID, {
            id: token?.sub,
          });
        token.id = user?._id;
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
