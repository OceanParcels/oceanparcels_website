import { Box, Container, Image, Text } from '@chakra-ui/react'
import React from 'react'

import { Heading } from '@/components/mdx'

export const Sponsors = () => {
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
          <Image src={'funderlogos.png'} alt={'Collage of funder logos.'} />

          <ul>
            <li>
              The European Research Council under the H2020 Starting Grant
              <a href='http://topios.org'>TOPIOS</a> project (grant agreement No
              715386).
            </li>
            <li>
              The European Union's Horizon 2020 research and innovation
              programme
              <a href='https://immerse-ocean.eu/'>IMMERSE</a> project (grant
              agreement No 821926)
            </li>
            <li>
              The European Union's Horizon 2020 research and innovation
              programme
              <a href='https://www.atlanteco.eu/'>AtlantECO</a> project (grant
              agreement No 862923)
            </li>
            <li>
              The Dutch Research Council (NWO) through the Backward Lagrangian
              Tracking of the Patchiness of Oceanic Nutrients in a Turbulent
              Ocean project (grant agreement OCENW.KLEIN.085)
            </li>
            <li>
              The Dutch Research Council (NWO) through the Dynamics and climatic
              imprint of the early Antarctic Circumpolar Current project (grant
              agreement ALWOP.207)
            </li>
            <li>
              The Dutch Research Council (NWO) through the Tracing Marine
              Macroplastics by Unravelling the Ocean's Multiscale Dispersion
              Patterns project (grant agreement VI.C.222.025)
            </li>
            <li>
              The European Space Agency (ESA) through the
              <a href='https://www.skim-ee9.org/'>
                Sea surface KInematics Multiscale monitoring (SKIM) Mission
                Science (SciSoc) Study
              </a>
              (Contract 4000124734/18/NL/CT/gp)
            </li>
            <li>
              The Pacific Community through the
              <a href='https://www.uu.nl/en/news/rdm-support-added-a-unique-feature-to-the-oceanparcels-code-thats-how-we-reeled-in-funding-for-a-new'>
                Application of Parcels to simulate the spatial and temporal
                movements of tuna to optimise designs of tuna tagging
                experiments"
              </a>
              project.
            </li>
            <li>
              The Galapagos Conservation Trust through the
              <a href='https://galapagosplasticfree.nl/'>
                Towards a plastic-free Galapagos: A new model to optimise beach
                cleanup strategies in complex island regions
              </a>
              project.
            </li>
            <li>
              The <a href='https://www.ukri.org/councils/epsrc/'>EPSRC</a>{' '}
              through an Institutional Sponsorship grant to Erik van Sebille
              under reference number EP/N50869X/1.
            </li>
            <li>
              <a href='https://www.imperial.ac.uk/'>Imperial College London</a>{' '}
              and specifically the
              <a href='https://www.imperial.ac.uk/grantham/'>
                Grantham Institute
              </a>
              .
            </li>
            <li>
              <a href='https://www.uu.nl/'>Utrecht University</a> and
              specifically the
              <a href='https://www.uu.nl/en/research/institute-for-marine-and-atmospheric-research-imau'>
                Institute for Marine and Atmospheric Research
              </a>
              and the
              <a href='https://www.uu.nl/en/news/rdm-support-added-a-unique-feature-to-the-oceanparcels-code-thats-how-we-reeled-in-funding-for-a-new'>
                Research Data Management Support
              </a>
              .
            </li>
          </ul>
        </Box>
      </Container>
    </Box>
  )
}
