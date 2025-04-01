// So that we can easily use different images for light and dark mode
import { Image, useColorModeValue } from '@chakra-ui/react'

export function ColorModeImage({ lightSrc, darkSrc, alt, ...props }) {
  const src = useColorModeValue(lightSrc, darkSrc)

  return <Image src={src} alt={alt} {...props} />
}
