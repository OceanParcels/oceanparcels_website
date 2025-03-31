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
import { Funders as data } from '@/data/funders'

import { Heading } from '@/components/mdx'

export const Funders = () => {
  const funders = React.useMemo(() => data, [])
  return (
    <Box id={'funders'} as='section'>
      <Container maxW='container.lg' centerContent>
        <Heading as='h1' size='2xl'>
          Funders
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
            {funders.map((funders, index) => (
              <Flex
                as={Link}
                href={funders.url}
                key={index}
                w={64}
                align={'center'}
                justify={'center'}
                rounded={'full'}
              >
                <Image maxH={20} src={funders.logo} alt={funders.name} />
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}
