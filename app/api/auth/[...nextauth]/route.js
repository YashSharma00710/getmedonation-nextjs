import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import User from '@/models/User'
import connectDB from '@/db/connectDB'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'

const handletheoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        try {
          await connectDB()
          // Use user.email instead of email param - GitHub may not always return email in callback
          const userEmail = user.email
          if (!userEmail) {
            console.error("GitHub sign-in: No email returned from GitHub")
            return false
          }
          const currentUser = await User.findOne({ email: userEmail })
          console.log(currentUser)
          if (!currentUser) {
            const newUser = new User({
              email: userEmail,
              username: userEmail.split("@")[0],
            })
            await newUser.save()
            console.log("New user created:", newUser.username)
          }
        } catch (error) {
          console.error("Error in signIn callback:", error)
          return false
        }
      }
      return true
    },
    async session({ session, user, token }) {
      try {
        await connectDB();

        if (!session?.user?.email) {
          return session;
        }

        const dbUser = await User.findOne({
          email: session.user.email,
        });

        if (dbUser) {
          session.user.name = dbUser.username;
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  }
})
export { handletheoptions as GET, handletheoptions as POST }
