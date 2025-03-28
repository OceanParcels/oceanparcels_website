import { Image, Link } from '@/components/mdx'
import { Box, Card, CardBody, Stack, Text } from '@chakra-ui/react'

export const ProjectCard = ({ name, description, repo, homepage, logo }) => {
  return (
    <Card
      as={Link}
      href={repo || homepage}
      p={4}
      rounded='lg'
      transitionProperty='all'
      transitionDuration='slower'
      transitionTimingFunction='ease-out'
      bg='gray.50'
      _dark={{ bg: 'gray.700' }}
      _hover={{
        transform: 'scale(1.025)',
        boxShadow: 'md',
        textDecoration: 'none',
      }}
    >
      <CardBody p={0}>
        <Stack
          spacing={2}
          direction={'column'}
          justify={'space-between'}
          gap={0}
        >
          <Box>
            <Image
              h={'55'}
              w={'full'}
              src={logo}
              alt={name}
              layout='fill'
              objectFit='contain'
            />

            <Text my={4} noOfLines={2}>
              {description}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}
