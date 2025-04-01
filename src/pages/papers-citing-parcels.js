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
import {
  papersCitingParcels,
  papersParcels,
} from '@/data/papers-citing-parcels'
import { Paper } from '@/components/paper'

const HowToCite = () => {
  return (
    <Box>
      <Accordion allowMultiple>
        {papersParcels.map((paper) => (
          <Paper
            key={paper.title}
            published_info={paper.published_info}
            title={paper.title}
            authors={paper.authors}
            link={paper.doi}
            abstract={paper.abstract}
          />
        ))}
      </Accordion>
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
            How to cite Parcels
          </Heading>

          <HowToCite />
          <Box id='papers-citing-parcels' />

          <Heading as='h1' size='2xl' textAlign={'center'} mt={32}>
            Peer-reviewed papers using Parcels
          </Heading>

          <Accordion allowMultiple>
            {papersCitingParcels.reverse().map((paper, index, array) => (
              <Paper
                key={paper.title}
                published_info={paper.published_info}
                title={paper.title}
                authors={paper.authors}
                link={paper.doi}
                abstract={paper.abstract}
                number={array.length - index}
              />
            ))}
          </Accordion>
        </Container>
      </Box>
    </Layout>
  )
}

export default PapersCitingParcels
