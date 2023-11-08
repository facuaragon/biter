import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

const adminEmails = [process.env.ADMIN_EMAIL_ONE, process.env.ADMIN_EMAIL_TWO];

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, token, user }) => {
      // console.log({ session, token, user });
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};
const handler = NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    return NextResponse.json({ message: `Not an Admin` }, { status: 400 });
  } else {
    return NextResponse.json({ message: `Ok` }, { status: 200 });
  }
}

export { handler as GET, handler as POST };
