import { useEffect } from 'react'
import Head from 'next/head'

export default function Redirect({ to }) {
  useEffect(() => {
    window.location.href = to
  }, [to])

  return (
    <>
      <Head>
        <meta httpEquiv='refresh' content={`0;url=${to}`} />
      </Head>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>
          Redirecting to <a href={to}>{to}</a>...
        </p>
      </div>
    </>
  )
}
