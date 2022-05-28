import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import invariant from 'invariant'

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3000'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        invariant(credentials, 'credentials is required')

        const { email, password } = credentials

        const response = await fetch(`${BASE_URL}/members/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        const { status, data } = await response.json()

        if (status === 200) {
          let user = {
            id: data.user.id as string,
            email: data.user.email as string,
            accessToken: data.token as string,
          }
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.accessToken = user.accessToken
        token.email = user.email
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = {
        id: token.id,
        email: token.email,
      }
      return session
    },
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
})
