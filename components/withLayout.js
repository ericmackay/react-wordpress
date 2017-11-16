import React from 'react'
import Link from 'next/link'

const withLayout = WrappedComponent => {
  class WithLayout extends React.Component {
    static async getInitialProps(...args) {
      if (typeof WrappedComponent.getInitialProps === 'function') {
        return WrappedComponent.getInitialProps(...args)
      }

      return {}
    }

    render() {
      const { props } = this

      return (
        <div>
          <style jsx global>
            {`
              body {
                font-family: Helvetica, arial, sans-serif;
              }
            `}
          </style>
          <header>
            <nav>
              <ul>
                <li>
                  <Link href="/">
                    <a>home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <a>blog</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <WrappedComponent {...props} />
          </main>
          <footer>this is the footer</footer>
        </div>
      )
    }
  }

  WithLayout.displayName = `withLayout(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'UnknownComponent'})`
  return WithLayout
}

export default withLayout
