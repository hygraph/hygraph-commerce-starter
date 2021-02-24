import Error from 'next/error'

import getNavigation from '@/lib/get-navigation'

function Custom404() {
  return <Error statusCode="404" />
}

export async function getStaticProps({ locale }) {
  const { navigation } = await getNavigation({ locale })

  return {
    props: {
      navigation
    }
  }
}

export default Custom404
