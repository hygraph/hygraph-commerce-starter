import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { ChevronDownIcon } from '@/icons'
import { GraphCMSSVG } from '@/svgs'
import { locales } from 'graphcms.config'

function Layout({ children, navigation = [] }) {
  const router = useRouter()

  const activeLocale = locales.find((locale) => locale.value === router.locale)

  const setLocale = (event) =>
    router.push(router.asPath, router.asPath, { locale: event.target.value })

  return (
    <React.Fragment>
      <header className="px-6 container mx-auto bg-white w-full block flex-grow flex items-center w-auto justify-between">
        <div className="pt-6 w-full">
          <nav className="flex items-center justify-between flex-wrap">
            <Link href="/">
              <a>
                <GraphCMSSVG className="h-auto text-primary w-5" />
              </a>
            </Link>
            <ul className="hidden md:mx-auto md:block md:flex-grow md:ml-4">
              {navigation.map((page) => (
                <li
                  key={page.id}
                  className="block my-4 md:inline-block md:my-0"
                >
                  <Link href={`/${page.type.toLowerCase()}/${page.slug}`}>
                    <a className="text-lightgray hover:text-slategray hover:bg-gainsboro rounded-full py-2 px-3 font-medium">
                      {page.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center">
              <form className="mt-4 sm:max-w-xs">
                <fieldset className="w-full">
                  <label htmlFor="language" className="sr-only">
                    Language
                  </label>
                  <div className="relative">
                    <select
                      id="language"
                      name="language"
                      value={activeLocale.value}
                      className="block appearance-none bg-white border-none px-4 py-0 pr-8 focus:outline-none focus:bg-white text-lightgray focus:text-slategray rounded-lg"
                      onChange={setLocale}
                    >
                      {locales.map((locale) => (
                        <option key={locale.value} value={locale.value}>
                          {locale.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                      <ChevronDownIcon
                        className="h-4 w-4 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
    </React.Fragment>
  )
}

export default Layout
