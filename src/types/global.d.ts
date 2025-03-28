// This file helps TypeScript understand your existing JavaScript code
// Add more type declarations as needed

declare module '*.md' {
  const content: string
  export default content
}

declare module '*.mdx' {
  const content: string
  export default content
}

// Add any other module declarations you need
