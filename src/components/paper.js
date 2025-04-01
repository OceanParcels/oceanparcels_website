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

export const Paper = ({
  title,
  published_info,
  authors,
  doi,
  abstract,
  number,
}) => {
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
            <Box as='i' textAlign='left'>
              {published_info}
            </Box>
            <Link
              textAlign='left'
              href={doi}
              color='blue.500'
              isExternal
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              View paper
            </Link>
            {number && (
              <Box as='i' color='gray.500' textAlign='left'>
                Article #{number}
              </Box>
            )}
          </Stack>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>{abstract}</Text>
      </AccordionPanel>
    </AccordionItem>
  )
}
