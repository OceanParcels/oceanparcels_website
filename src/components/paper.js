import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Link,
  Stack,
} from '@chakra-ui/react'

export const Paper = ({ title, authors, link, abstract, number }) => {
  return (
    <AccordionItem
      my={4}
      borderWidth={1}
      borderColor='gray.200'
      borderRadius='md'
      overflow='hidden'
    >
      <h2>
        <AccordionButton>
          <AccordionIcon mx={8} />
          <Stack direction='column'>
            <Box as='b' textAlign='left'>
              {title}
            </Box>
            <Box textAlign='left'>{authors}</Box>
            <Box as='i' color='gray.500' textAlign='left'>
              Article #{number}
            </Box>
          </Stack>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>{abstract}</Text>
        <Link href={link} color='blue.500' isExternal>
          View paper
        </Link>
      </AccordionPanel>
    </AccordionItem>
  )
}
