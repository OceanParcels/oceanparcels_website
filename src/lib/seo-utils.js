export function getRootURL() {
  let url = 'https://xarray.dev'
  if (
    process.env.NEXT_PUBLIC_VERCEL_URL &&
    process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
  ) {
    url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  return url
}
