import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { NextComponentType, NextPageContext } from 'next'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    user: {
      id: string
      email: string
    }
  }

  interface User {
    id: string
    email: string
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    accessToken: string
  }
}

declare module 'next/app' {
  type AppProps<P = Record<string, unknown>> = {
    Component: NextComponentType<NextPageContext, any, P> & {
      auth: boolean
    }
    router: Router
    __N_SSG?: boolean
    __N_SSP?: boolean
    pageProps: P & {
      session: Session
    }
  }
}
