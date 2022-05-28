import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export function Hello() {
  const { data, status } = useSession()

  return (
    <div>
      {data ? (
        <>
          {data?.user?.email}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <Link href="/api/auth/signin" passHref>
          <a>Login</a>
        </Link>
      )}
    </div>
  )
}
