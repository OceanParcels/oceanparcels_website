import { Layout } from '@/components/layout'
import {
  Box,
  Container,
  Heading,
  Text,
  Accordion,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react'
import { papersCitingParcels } from '@/data/papers-citing-parcels'
import { Paper } from '@/components/paper'

const HowToCite = () => {
  return (
    <Box>
      <Text>
        The manuscript detailing the first release of Parcels, version 0.9, has
        been published in{' '}
        <Link
          href='https://www.geosci-model-dev.net/10/4175/2017/gmd-10-4175-2017.html'
          color='blue.500'
          isExternal
        >
          Geoscientific Model Development
        </Link>{' '}
        and can be cited as:
      </Text>

      <List spacing={2} my={4} fontStyle='italic'>
        <ListItem>
          Lange, M and E van Sebille (2017) Parcels v0.9: prototyping a
          Lagrangian Ocean Analysis framework for the petascale age.
          Geoscientific Model Development, 10, 4175-4186.{' '}
          <Link
            href='https://doi.org/10.5194/gmd-2017-167'
            color='blue.500'
            isExternal
          >
            https://doi.org/10.5194/gmd-2017-167
          </Link>
        </ListItem>
      </List>

      <Text mt={4}>
        The manuscript detailing version 2.0 of Parcels is available at{' '}
        <Link
          href='https://www.geosci-model-dev.net/12/3571/2019/gmd-12-3571-2019-discussion.html'
          color='blue.500'
          isExternal
        >
          Geoscientific Model Development
        </Link>{' '}
        and can be cited as:
      </Text>

      <List spacing={2} my={4} fontStyle='italic'>
        <ListItem>
          Delandmeter, P and E van Sebille (2019) The Parcels v2.0 Lagrangian
          framework: new field interpolation schemes. Geoscientific Model
          Development, 12, 3571-3584.{' '}
          <Link
            href='https://doi.org/10.5194/gmd-12-3571-2019'
            color='blue.500'
            isExternal
          >
            https://doi.org/10.5194/gmd-12-3571-2019
          </Link>
        </ListItem>
      </List>

      <Text mt={4}>
        The manuscript detailing the performance of Parcels v2.4 is available at{' '}
        <Link
          href='https://doi.org/10.1016/j.cageo.2023.105322'
          color='blue.500'
          isExternal
        >
          Computers & Geosciences
        </Link>{' '}
        and can be cited as:
      </Text>

      <List spacing={2} my={4} fontStyle='italic'>
        <ListItem>
          Kehl, C, PD Nooteboom, MLA Kaandorp and E van Sebille (2023)
          Efficiently simulating Lagrangian particles in large-scale ocean flows
          — Data structures and their impact on geophysical applications,
          Computers and Geosciences, 175, 105322.{' '}
          <Link
            href='https://doi.org/10.1016/j.cageo.2023.105322'
            color='blue.500'
            isExternal
          >
            https://doi.org/10.1016/j.cageo.2023.105322
          </Link>
        </ListItem>
      </List>
    </Box>
  )
}

const PapersCitingParcels = () => {
  return (
    <Layout
      title={'Papers citing Parcels'}
      card={
        'https://raw.githubusercontent.com/OceanParcels/oceanparcels_website/main/public/parcels-assets/logo-no-text.png'
      }
      url={`/papers-citing-parcels`}
    >
      <Box as='section' py={20}>
        <Container maxW='container.lg'>
          <Heading as='h1' size='2xl' textAlign={'center'}>
            Papers Citing Parcels
          </Heading>

          <Box py={4}>
            <Text>
              Peer-reviewed articles using Parcels.
              {/* TODO: Copy edit this text */}
            </Text>
          </Box>
          <Accordion allowMultiple>
            {papersCitingParcels.reverse().map((paper, index, array) => (
              <Paper
                key={paper.title}
                title={paper.title}
                authors={paper.authors}
                doi={paper.doi}
                abstract={paper.abstract}
                number={array.length - index}
              />
            ))}
          </Accordion>

          <Heading
            as='h1'
            size='2xl'
            textAlign={'center'}
            id='how-to-cite-parcels'
          >
            How to cite Parcels
          </Heading>

          <HowToCite />
        </Container>
      </Box>
    </Layout>
  )
}

export default PapersCitingParcels
