import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'

import { Image, Link } from '@/components/mdx'

export const HeroBanner = () => {
  return (
    <Box as='section'>
      <Container maxW='container.lg' py={24} centerContent>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          justify={'center'}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  zIndex: -1,
                }}
              >
                Parcels
              </Text>
              <br />
              <Text as={'span'} color={'blue.400'}>
                A highly customisable Lagrangian simulation framework
              </Text>
            </Heading>
            <Text fontSize={'lg'}>
              The Ocean<strong>Parcels</strong> project develops{' '}
              <strong>Parcels</strong> (<strong>P</strong>robably{' '}
              <strong>A</strong> <strong>R</strong>eally <strong>C</strong>
              omputationally <strong>E</strong>fficient <strong>L</strong>
              agrangian <strong>S</strong>imulator), a set of Python classes and
              methods to create customisable particle tracking simulations using
              output from Ocean Circulation models. Parcels can be used to track
              passive and active particulates such as water, plankton, plastic
              and fish.
            </Text>
          </Stack>
          <Stack flex={1} spacing={{ base: 10, md: 20 }}>
            <Image
              src={'/homepage-animation.gif'}
              alt='Animation of virtual particles in the global oceans'
              objectFit='contain'
            ></Image>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              justify={'center'}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Button
                useExternalIcon
                as={Link}
                variant={'outline'}
                colorScheme={'blue'}
                href='https://docs.oceanparcels.org'
              >
                Get Started
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
