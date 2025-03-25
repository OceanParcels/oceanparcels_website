import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react'

import { Image, Link } from '@/components/mdx'
import { footerItems } from '@/data/footer-items'

const SocialButton = ({ children, label, href }) => {
  return (
    <Button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={12}
      h={12}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  )
}

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'bold'} my={2}>
      {children}
    </Text>
  )
}

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      as='footer'
    >
      <Container maxW='container.lg' my={8} centerContent>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          spacing={{ base: 2, md: 8 }}
        >
          <Stack spacing={6}>
            <Box>
              <Image
                w={32}
                src={'/Xarray-assets/RGB/Xarray_Logo_RGB_Final.svg'}
                alt={'xarray logo'}
              />
            </Box>

            <Text fontSize={'sm'}>
              © {new Date().getFullYear()}, Xarray core developers. Apache 2.0
              Licensed.
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Parcels</ListHeader>

            {footerItems.parcels.map((item) => {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  fontSize={'sm'}
                  _hover={{ color: 'blue.500' }}
                >
                  {item.label}
                </Link>
              )
            })}
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Resources</ListHeader>
            {footerItems.resources.map((item) => {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  fontSize={'sm'}
                  _hover={{ color: 'blue.500' }}
                >
                  {item.label}
                </Link>
              )
            })}
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Community</ListHeader>
            {footerItems.community.map((item) => {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  fontSize={'sm'}
                  _hover={{ color: 'blue.500' }}
                >
                  {item.label}
                </Link>
              )
            })}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
