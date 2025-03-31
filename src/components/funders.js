import {
  Box,
  Container,
  Image,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Grid,
  GridItem,
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

          <Grid templateColumns='repeat(5, 1fr)' gap={6} my={4}>
            {funders.map((funders, index) => (
              <GridItem
                as={Link}
                href={funders.url}
                key={index}
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                <Image
                  maxH={20}
                  w={'auto'}
                  src={funders.logo}
                  alt={funders.name}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
