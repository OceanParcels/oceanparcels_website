import { Layout } from '@/components/layout'
import { Image, Link } from '@/components/mdx'
import { TeamMember } from '@/components/team-member'
import { TeamMembers } from '@/data/team-members'
import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'

const Team = () => {
  return (
    <Layout
      title={'Utrecht Team'}
      card={
        'https://raw.githubusercontent.com/xarray-contrib/xarray.dev/main/public/Xarray-assets/Icon/Xarray_Icon_Final.png'
      }
      url={`/team`}
    >
      <Box as='section' py={20}>
        <Container maxW='container.lg'>
          <Heading as='h1' size='2xl' textAlign={'center'}>
            Team
          </Heading>

          <Box py={4}>
            <Heading as='h2' size='xl' textAlign={'center'} my={16}>
              Utrecht Team
            </Heading>
            <Text>
              The Lagrangian Ocean Analysis team within the{' '}
              <Link
                href={
                  'https://www.uu.nl/en/research/institute-for-marine-and-atmospheric-research-imau'
                }
              >
                Institute for Marine and Atmospheric research
              </Link>{' '}
              at <Link href={'https://www.uu.nl/en'}>Utrecht University</Link>'s
              Department of Physics, uses the Parcels framework to create and
              analyse simulations of the transport of material (plastics,
              plankton, fish) by ocean currents and its impact on climate and
              marine ecosystems. Within the group, we adhere to Open Science
              principles and aim to create a collaborative and inclusive
              atmosphere.
            </Text>
          </Box>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 2, xl: 2, '2xl': 3 }}
            spacing={8}
            my={4}
            align={'left'}
          >
            {TeamMembers.map((member) => (
              <TeamMember key={member.name} member={member} />
            ))}
          </SimpleGrid>
          <Heading as='h2' size='xl' textAlign={'center'} my={16}>
            Our valuable contributors 💖
          </Heading>
          <Text>
            Xarray is made with love by more than{' '}
            <Link
              href={'https://github.com/pydata/xarray/graphs/contributors'}
              useExternalIcon
            >
              370 volunteer contributors
            </Link>
            . We appreciate all contributions from community to make Xarray
            thrive.
          </Text>
          <Box
            as={Link}
            href={'https://github.com/pydata/xarray/graphs/contributors'}
          >
            <Image
              my={8}
              src={'https://contrib.rocks/image?repo=pydata/xarray'}
              alt={'Xarray Contributors'}
            />
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default Team
