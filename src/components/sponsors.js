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
        </Box>
      </Container>
    </Box>
  )
}
