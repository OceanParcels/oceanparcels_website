import { Banner } from '@/components/banner'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Link } from '@/components/mdx'
import { Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import ReactGA from 'react-ga4'
import { useEffect } from 'react'
import 'katex/dist/katex.min.css'

// Google Analytics
ReactGA.initialize('G-62W42QPRQC')

export const Layout = ({
  title,
  description,
  card,
  children,
  url = 'https://parcels-code.org',
  enableBanner = false,
}) => {
  // Track page views
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview' })
  }, [])

  const bannerTitle =
    'Join the Parcels 10 year anniversary event 🎉 on 1-3 Oct 2025!'
  const bannerDescription = ''
  const bannerChildren = (
    <Link href='https://parcels-code.org/10year-event'>Learn more</Link>
  )

  // Determine the base URL based on the environment
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://parcels-code.org'
      : 'http://localhost:3000'

  // Construct the full card URL
  const fullCardUrl = card.startsWith('http') ? card : `${baseUrl}${card}`

  return (
    <>
      <Head>
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={fullCardUrl} />
        <meta property='og:url' content={url} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={fullCardUrl} />
        <meta name='twitter:card' content='summary_large_image' />
        <link
          rel='icon'
          type='image/png'
          sizes='96x96'
          href='/parcels-assets/logo-no-text.svg'
        />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='icon' type='image/png' href='/favicon.png' />

        <title>{title}</title>
      </Head>
      <Flex
        direction={'column'}
        justify={'space-between'}
        gap={0}
        minHeight={'100vh'}
      >
        <Box>
          <Header />
          {enableBanner && (
            <Banner title={bannerTitle} description={bannerDescription}>
              {bannerChildren}
            </Banner>
          )}
          {children}
        </Box>

        <Footer />
      </Flex>
    </>
  )
}

export default Layout
