import { Layout } from '@/components/layout'
import { Box, Container, Heading, Text, Accordion } from '@chakra-ui/react'
import { papersCitingParcels } from '@/data/papers-citing-parcels'
import { Paper } from '@/components/paper'

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
          <Accordion allowMultiple allowToggle>
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
        </Container>
      </Box>
    </Layout>
  )
}

export default PapersCitingParcels
