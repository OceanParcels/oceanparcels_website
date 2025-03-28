import { Layout } from '@/components/layout'
import { Image, Link } from '@/components/mdx'
import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'

const Accessibility = () => {
  return (
    <Layout
      title={'Accessibility'}
      card={
        'https://raw.githubusercontent.com/OceanParcels/oceanparcels_website/main/public/parcels-assets/logo-no-text.png'
      }
      url={`/accessibility`}
    >
      <Box as='section' py={20}>
        <Container maxW='container.lg'>
          <Heading as='h1' size='2xl' textAlign={'center'}>
            Accessibility
          </Heading>

          <Box py={4}>
            <Text>
              We are committed to making our website accessible to all users.
              Our website has been assessed using the{' '}
              <Link
                href='https://wave.webaim.org/extension/'
                color='blue.500'
                isExternal
              >
                WAVE (Web Accessibility Evaluation Tool)
              </Link>{' '}
              and has been found to have good accessibility features, including
              appropriate color contrast ratios and ARIA (Accessible Rich
              Internet Applications) support. We continuously monitor and
              improve accessibility to ensure all users can access our content
              effectively. Please contact{' '}
              <Link
                href={'https://www.uu.nl/staff/EvanSebille'}
                color='blue.500'
                isExternal
              >
                Erik van Sebille
              </Link>{' '}
              if you have any feedback or suggestions for improvement.
            </Text>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default Accessibility
