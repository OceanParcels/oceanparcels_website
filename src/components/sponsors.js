import {
  Box,
  Container,
  Image,
  Text,
  UnorderedList,
  ListItem,
  Link,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react'
import React from 'react'
import { Sponsors as data } from '@/data/sponsors'

import { Heading } from '@/components/mdx'

const FundingSources = () => {
  return (
    <UnorderedList spacing={2}>
      <ListItem>
        The European Research Council under the H2020 Starting Grant{' '}
        <Link href='http://topios.org' color='blue.500' isExternal>
          TOPIOS
        </Link>{' '}
        project (grant agreement No 715386).
      </ListItem>
      <ListItem>
        The European Union's Horizon 2020 research and innovation programme{' '}
        <Link href='https://immerse-ocean.eu/' color='blue.500' isExternal>
          IMMERSE
        </Link>{' '}
        project (grant agreement No 821926)
      </ListItem>
      <ListItem>
        The European Union's Horizon 2020 research and innovation programme{' '}
        <Link href='https://www.atlanteco.eu/' color='blue.500' isExternal>
          AtlantECO
        </Link>{' '}
        project (grant agreement No 862923)
      </ListItem>
      <ListItem>
        The Dutch Research Council (NWO) through the Backward Lagrangian
        Tracking of the Patchiness of Oceanic Nutrients in a Turbulent Ocean
        project (grant agreement OCENW.KLEIN.085)
      </ListItem>
      <ListItem>
        The Dutch Research Council (NWO) through the Dynamics and climatic
        imprint of the early Antarctic Circumpolar Current project (grant
        agreement ALWOP.207)
      </ListItem>
      <ListItem>
        The Dutch Research Council (NWO) through the Tracing Marine
        Macroplastics by Unravelling the Ocean's Multiscale Dispersion Patterns
        project (grant agreement VI.C.222.025)
      </ListItem>
      <ListItem>
        The European Space Agency (ESA) through the{' '}
        <Link href='https://www.skim-ee9.org/' color='blue.500' isExternal>
          Sea surface KInematics Multiscale monitoring (SKIM) Mission Science
          (SciSoc) Study
        </Link>{' '}
        (Contract 4000124734/18/NL/CT/gp)
      </ListItem>
      <ListItem>
        The Pacific Community through the{' '}
        <Link
          href='https://www.uu.nl/en/news/rdm-support-added-a-unique-feature-to-the-oceanparcels-code-thats-how-we-reeled-in-funding-for-a-new'
          color='blue.500'
          isExternal
        >
          Application of Parcels to simulate the spatial and temporal movements
          of tuna to optimise designs of tuna tagging experiments
        </Link>{' '}
        project.
      </ListItem>
      <ListItem>
        The Galapagos Conservation Trust through the{' '}
        <Link
          href='https://galapagosplasticfree.nl/'
          color='blue.500'
          isExternal
        >
          Towards a plastic-free Galapagos: A new model to optimise beach
          cleanup strategies in complex island regions
        </Link>{' '}
        project.
      </ListItem>
      <ListItem>
        The{' '}
        <Link
          href='https://www.ukri.org/councils/epsrc/'
          color='blue.500'
          isExternal
        >
          EPSRC
        </Link>{' '}
        through an Institutional Sponsorship grant to Erik van Sebille under
        reference number EP/N50869X/1.
      </ListItem>
      <ListItem>
        <Link href='https://www.imperial.ac.uk/' color='blue.500' isExternal>
          Imperial College London
        </Link>{' '}
        and specifically the{' '}
        <Link
          href='https://www.imperial.ac.uk/grantham/'
          color='blue.500'
          isExternal
        >
          Grantham Institute
        </Link>
        .
      </ListItem>
      <ListItem>
        <Link href='https://www.uu.nl/' color='blue.500' isExternal>
          Utrecht University
        </Link>{' '}
        and specifically the{' '}
        <Link
          href='https://www.uu.nl/en/research/institute-for-marine-and-atmospheric-research-imau'
          color='blue.500'
          isExternal
        >
          Institute for Marine and Atmospheric Research
        </Link>{' '}
        and the{' '}
        <Link
          href='https://www.uu.nl/en/news/rdm-support-added-a-unique-feature-to-the-oceanparcels-code-thats-how-we-reeled-in-funding-for-a-new'
          color='blue.500'
          isExternal
        >
          Research Data Management Support
        </Link>
        .
      </ListItem>
    </UnorderedList>
  )
}

export const Sponsors = () => {
  const sponsors = React.useMemo(() => data, [])
  return (
    <Box id={'sponsors'} as='section'>
      <Container maxW='container.lg' centerContent>
        <Heading as='h1' size='2xl'>
          Sponsors
        </Heading>

        <Box my={8}>
          <Text fontSize={'lg'}>
            Parcels development has been supported by the following
            organisations:
          </Text>

          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
            my={4}
            spacing={'space-between'}
            align={'center'}
            justify={'center'}
          >
            {sponsors.map((sponsor, index) => (
              <Flex
                as={Link}
                href={sponsor.url}
                key={index}
                w={64}
                h={64}
                align={'center'}
                justify={'center'}
                rounded={'full'}
              >
                <Image w={36} h={36} src={sponsor.logo} alt={sponsor.name} />
              </Flex>
            ))}
          </SimpleGrid>

          <FundingSources />
        </Box>
      </Container>
    </Box>
  )
}
