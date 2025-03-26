import { Image } from '@/components/mdx'
import { SocialLink } from '@/components/social-link'
import { useGHUSER } from '@/lib/data-fetching'
import { Box, Circle, Flex, Button, Stack, Text } from '@chakra-ui/react'
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

export const TeamMember = ({ member }) => {
  return (
    <Stack direction='row' spacing={6} align='flex-start'>
      <Circle overflow='hidden'>
        <Flex w={32} h={32} align={'center'} justify={'center'}>
          {' '}
          <Image src={member.image} alt={member.name} />
        </Flex>
      </Circle>

      <Stack spacing={4}>
        <Text fontWeight={'bold'}>{member.name}</Text>
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
      </Stack>
    </Stack>
  )
}
