import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from 'next-auth/react'

import '../global.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

export default MyApp

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession({
    required: true,
  })

  const loading = status === 'loading'

  const hasUser = !!session?.user

  if (loading || !hasUser) return <p>Waiting for session...</p>

  return <>{children}</>
}
