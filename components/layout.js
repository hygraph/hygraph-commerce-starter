import * as React from 'react'
import Link from 'next/link'

import { GraphCMSSVG } from './svgs'

function Layout({ children, navigation = [] }) {
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
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
    </React.Fragment>
  )
}

export default Layout
