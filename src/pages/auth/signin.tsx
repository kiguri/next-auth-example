import type { GetServerSideProps } from 'next'
import { getCsrfToken, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const router = useRouter()

  const { error } = router.query

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      router.push('/profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <div className="h-screen grid place-content-center">
      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="border shadow p-8 space-y-4"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <label className="space-y-2">
          <span className="">Email</span>
          <input name="email" type="email" className="block w-full" />
        </label>

        <label className="space-y-2">
          <span className="table-cell">Password</span>
          <input name="password" type="password" className="block w-full" />
        </label>

        <button
          type="submit"
          className="border transition bg-blue-500 text-white px-4 py-1 rounded hover:ring-1 hover:ring-blue-500 hover:text-blue-500 hover:bg-white"
        >
          Sign in
        </button>
      </form>

      <hr />

      <div className="text-red-600 font-bold mt-2 text-sm">{error}</div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
