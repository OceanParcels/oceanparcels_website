import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

import { Heading } from '@/components/mdx'
import { ProjectCard } from '@/components/project-card'
import { Projects as ProjectsData } from '@/data/projects'

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
            This section lists some of the standalone packages and projects
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
