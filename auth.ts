import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.includes("/api/auth/signin")) {
        return baseUrl; // Send user to homepage after login
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session }) {
      return session;
    },
  },
});
