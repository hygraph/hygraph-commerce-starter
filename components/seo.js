import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { defaultUrl } from 'next-seo.config'

function SEO({ image, ...props }) {
  const router = useRouter()

  const SEO = {
    openGraph: {
      ...(image && {
        images: [
          {
            alt: props.title,
            ...image
          }
        ]
      }),
      url: defaultUrl + router.asPath,
      ...props
    },
    ...props
  }

  return <NextSeo {...SEO} />
}

export default SEO
