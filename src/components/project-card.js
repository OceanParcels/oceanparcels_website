import { Link } from '@/components/mdx'
import { Box, Card, CardBody, Stack, Text } from '@chakra-ui/react'
import { ColorModeImage } from '@/components/ColorModeImage'

export const ProjectCard = ({
  name,
  description,
  repo,
  homepage,
  logo_light,
  logo_dark,
}) => {
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
            <ColorModeImage
              h={'128'}
              w={'full'}
              lightSrc={logo_light}
              darkSrc={logo_dark}
              alt={name}
              layout='fill'
              objectFit='contain'
            />

            <Text my={4} noOfLines={4}>
              {description}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}
