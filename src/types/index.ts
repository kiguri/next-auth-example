import type { NextPage } from 'next'

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  auth: boolean
}
