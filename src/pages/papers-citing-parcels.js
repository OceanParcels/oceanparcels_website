import { Layout } from '@/components/layout'
import { Box, Container, Heading, Text, Accordion } from '@chakra-ui/react'
import { papersCitingParcels } from '@/data/papers-citing-parcels'
import { Paper } from '@/components/paper'

const HowToCite = () => {
  return (
    <Box>
      <Text mt={8}>
        The preferred way to cite the latest version of Parcels in your
        publications is to use the following reference:
      </Text>
      <Accordion allowMultiple>
        <Paper
          key='The Parcels v2.0 Lagrangian framework: new field interpolation schemes'
          published_info='Geoscientific Model Development, 12, 3571-3584'
          title='The Parcels v2.0 Lagrangian framework: new field interpolation schemes'
          authors='Delandmeter, P and E van Sebille (2019)'
          doi='https://doi.org/10.5194/gmd-12-3571-2019'
          abstract="With the increasing amount of data produced by numerical ocean models, so increases the need for efficient tools to analyse these data. One of these tools is Lagrangian ocean analysis, where a set of virtual particles are released and their dynamics is integrated in time based on fields defining the ocean state, including the hydrodynamics and biogeochemistry if available. This popular methodology needs to adapt to the large variety of models producing these fields at different formats. This is precisely the aim of Parcels, a Lagrangian ocean analysis framework designed to combine (1) a wide flexibility to model particles of different natures and (2) an efficient implementation in accordance with modern computing infrastructure. In the new Parcels v2.0, we implement a set of interpolation schemes to read various types of discretised fields, from rectilinear to curvilinear grids in the horizontal direction, from z- to s- levels in the vertical and different variable distributions such as the Arakawa's A-, B- and C- grids. In particular, we develop a new interpolation scheme for a three-dimensional curvilinear C-grid and analyse its properties. Parcels v2.0 capabilities, including a suite of meta-field objects, are then illustrated in a brief study of the distribution of floating microplastic in the North West European continental shelf and its sensitivity to different physical processes."
        />
      </Accordion>
      <Text mt={8}>Other papers that provide details about Parcels are:</Text>
      <Accordion allowMultiple>
        <Paper
          key='Parcels v0.9: prototyping a Lagrangian Ocean Analysis framework for the petascale age'
          published_info='Geoscientific Model Development, 10, 4175-4186'
          title='Parcels v0.9: prototyping a Lagrangian Ocean Analysis framework for the petascale age'
          authors='Lange, M and E van Sebille (2017)'
          doi='https://doi.org/10.5194/gmd-2017-167'
          abstract='As ocean general circulation models (OGCMs) move into the petascale age, where the output of single simulations exceeds petabytes of storage space, tools to analyse the output of these models will need to scale up too. Lagrangian ocean analysis, where virtual particles are tracked through hydrodynamic fields, is an increasingly popular way to analyse OGCM output, by mapping pathways and connectivity of biotic and abiotic particulates. However, the current software stack of Lagrangian ocean analysis codes is not dynamic enough to cope with the increasing complexity, scale and need for customization of use-cases. Furthermore, most community codes are developed for stand-alone use, making it a nontrivial task to integrate virtual particles at runtime of the OGCM. Here, we introduce the new Parcels code, which was designed from the ground up to be sufficiently scalable to cope with petascale computing. We highlight its API design that combines flexibility and customization with the ability to optimize for HPC workflows, following the paradigm of domain-specific languages. Parcels is primarily written in Python, utilizing the wide range of tools available in the scientific Python ecosystem, while generating low-level C code and using just-in-time compilation for performance-critical computation. We show a worked-out example of its API, and validate the accuracy of the code against seven idealized test cases. This version 0.9 of Parcels is focused on laying out the API, with future work concentrating on support for curvilinear grids, optimization, efficiency and at-runtime coupling with OGCMs.'
        />
        <Paper
          key='Efficiently simulating Lagrangian particles in large-scale ocean flows — Data structures and their impact on geophysical applications'
          published_info='Computers and Geosciences, 175, 105322'
          title='Efficiently simulating Lagrangian particles in large-scale ocean flows — Data structures and their impact on geophysical applications'
          authors='Kehl, C, PD Nooteboom, MLA Kaandorp and E van Sebille (2023)'
          doi='https://doi.org/10.1016/j.cageo.2023.105322'
          abstract='Studying oceanography by using Lagrangian simulations has been adopted for a range of scenarios, such as the determining the fate of microplastics in the ocean, simulating the origin locations of microplankton used for palaeoceanographic reconstructions, and for studying the impact of fish aggregation devices on the migration behaviour of tuna. These simulations are complex and represent a considerable runtime effort to obtain trajectory results, which is the prime motivation for enhancing the performance of Lagrangian particle simulators. This paper assesses established performance enhancing techniques from Eulerian simulators in light of computational conditions and demands of Lagrangian simulators. A performance enhancement strategy specifically targeting physics-based Lagrangian particle simulations is outlined to address the performance gaps, and techniques for closing the performance gap are presented and implemented. Realistic experiments are derived from three specific oceanographic application scenarios, and the suggested performance-enhancing techniques are benchmarked in detail, so to allow for a good attribution of speed-up measurements to individual techniques. The impacts and insights of the performance enhancement strategy are further discussed for Lagrangian simulations in other geoscience applications. The experiments show that I/O-enhancing techniques, such as dynamic loading and buffering, lead to considerable speed-up on-par with an idealised parallelisation of the process over 20 nodes. Conversely, while the cache-efficient structure-of-arrays collection yields a visible speed-up, other alternative data structures fail in fulfilling the theoretically-expected performance increase. This insight demonstrates the importance of good data alignment in memory and caches for Lagrangian physics simulations.'
        />
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
