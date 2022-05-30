import { GetServerSideProps } from 'next'
import { getCsrfToken } from 'next-auth/react'

const ErrorPage = () => {
  return <div>error</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default ErrorPage
