import getNavigation from '@/lib/get-navigation'

function IndexPage() {
  return 'Hello world!'
}

export async function getStaticProps({ locale }) {
  const navigation = await getNavigation({ locale })

  return {
    props: { navigation }
  }
}

export default IndexPage
