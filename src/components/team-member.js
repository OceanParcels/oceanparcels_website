import { Image } from '@/components/mdx'
import { SocialLink } from '@/components/social-link'
import { useGHUSER } from '@/lib/data-fetching'
import { Button, Circle, Flex, Card, Stack, Text } from '@chakra-ui/react'
import { IoIosGlobe, IoLogoGithub, IoLogoTwitter } from 'react-icons/io'
import { FaResearchgate } from 'react-icons/fa'
import { FaGoogleScholar } from 'react-icons/fa6'
const SocialLogos = {
  github: IoLogoGithub,
  twitter: IoLogoTwitter,
  researchgate: FaResearchgate,
  googlescholar: FaGoogleScholar,
  website: IoIosGlobe,
}

import {
  CardBody,
  ButtonGroup,
  Divider,
  CardFooter,
  Heading,
} from '@chakra-ui/react'

import { Avatar } from '@chakra-ui/react'

export const TeamMember = ({ member }) => {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image src={member.image} alt={member.name} borderRadius='lg' />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{member.name}</Heading>
          <Heading size='sm'>{member.position}</Heading>
          <Text>{member.description}</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        {member.links && (
          <Stack direction={'row'} align='center' spacing={2}>
            {Object.entries(member.links).map(([key, href]) => {
              // Check if the link key exists in SocialLogos
              const LogoComponent = SocialLogos[key]
              return LogoComponent ? (
                <SocialLink
                  key={key}
                  href={href}
                  icon={LogoComponent}
                  label={`View ${member.name}'s ${key}`}
                />
              ) : (
                <Button
                  key={key}
                  rounded='full'
                  variant='outline'
                  onClick={() => window.open(href, '_blank')}
                >
                  {key}
                </Button>
              )
            })}
          </Stack>
        )}
      </CardFooter>
    </Card>
  )
}
