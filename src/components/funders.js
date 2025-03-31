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

          <Grid
            templateColumns={`repeat(${funders.length}, minmax(auto, max-content))`}
            gap={6}
            my={4}
            justifyContent='center'
          >
            {funders.map((funder, index) => (
              <GridItem
                as={Link}
                href={funder.url}
                key={index}
                display='flex'
                alignItems='center'
                justifyContent='center'
                borderRight={
                  index < funders.length - 1 ? '1px solid #ccc' : 'none'
                }
                pr={4}
              >
                <Image maxH={20} src={funder.logo} alt={funder.name} />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
