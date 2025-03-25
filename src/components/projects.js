import {
  Box,
  Button,
  Container,
  Stack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import React from 'react'

import { Heading, Link } from '@/components/mdx'
import { ProjectCard } from '@/components/project-card'
import { Projects as ProjectsData } from '@/data/projects'

import { IoLogoGithub } from 'react-icons/io5'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const GitHubStats = () => {
  const { data, error } = useSWR(
    'https://xarray-datasette.fly.dev/github/_analyze_tables_/stars,user.json?_shape=array',
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Stack direction='row' spacing={4} justify='center'>
      <Button
        as={Link}
        href={'https://github.com/pydata/xarray/stargazers'}
        rounded={'full'}
        size={'lg'}
        leftIcon={<IoLogoGithub />}
        variant='outline'
      >
        {data[0].total_rows.toLocaleString(undefined, {
          minimumFractionDigits: 0,
        })}{' '}
        Stars
      </Button>
    </Stack>
  )
}

export const Projects = () => {
  const projects = React.useMemo(() => ProjectsData, [])
  return (
    <Box id={'projects'} as='section'>
      <Container maxW='container.lg' centerContent>
        <Heading as='h1' size='2xl'>
          Projects
        </Heading>

        <Box my={8}>
          <Text fontSize={'lg'}>
            This section lists some of the standalone packages, projects
            developed with Parcels.
          </Text>

          <SimpleGrid
            my={8}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            justifyContent={'space-between'}
          >
            {projects
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((project, index) => (
                <ProjectCard
                  key={index}
                  name={project.name}
                  logo={project.logo}
                  description={project.description}
                  repo={project.repo}
                  homepage={project.homepage}
                ></ProjectCard>
              ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}
