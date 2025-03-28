import { Layout } from '@/components/layout'
import { Image, Link } from '@/components/mdx'
import { TeamMember } from '@/components/team-member'
import { CurrentTeamMembers } from '@/data/team-members'
import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'

const Team = () => {
  return (
    <Layout
      title={'Utrecht Team'}
      card={
        'https://raw.githubusercontent.com/OceanParcels/oceanparcels_website/main/public/parcels-assets/logo-no-text.png'
      }
      url={`/team`}
    >
      <Box as='section' py={20}>
        <Container maxW='container.lg'>
          <Heading as='h1' size='2xl' textAlign={'center'}>
            Utrecht Team
          </Heading>

          <Box py={4}>
            <Text>
              The Lagrangian Ocean Analysis team within the{' '}
              <Link
                href='https://www.uu.nl/en/research/institute-for-marine-and-atmospheric-research-imau'
                color='blue.500'
                isExternal
              >
                Institute for Marine and Atmospheric research
              </Link>{' '}
              at{' '}
              <Link href='https://www.uu.nl/en' color='blue.500' isExternal>
                Utrecht University
              </Link>
              's Department of Physics, uses the Parcels framework to create and
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
            {CurrentTeamMembers.map((member) => (
              <TeamMember key={member.name} member={member} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  )
}

export default Team
