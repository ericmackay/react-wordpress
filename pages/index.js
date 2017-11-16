import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import withLayout from '../components/withLayout'

const HomePage = () => (
  <div>
    <Head>
      <title> Welcome to my blog </title>
    </Head>
    <Link href="/blog">
      <a>Go to the recent posts</a>
    </Link>
  </div>
)

export default withLayout(HomePage)
