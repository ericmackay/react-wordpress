import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import api from '../api'
import withLayout from '../components/withLayout'

class BlogPost extends React.Component {
  static async getInitialProps({ query: { slug }, res }) {
    const post = (await api
      .posts()
      .slug(slug)
      .embed())[0]
    if (post) {
      return { post }
    }

    if (res) {
      res.statusCode = 404
    }
    return { error: true }
  }

  render() {
    if (this.props.error) {
      return <div>Post not found</div>
    }
    const { post } = this.props

    return (
      <div>
        <Head>{post.title.rendered}</Head>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <p>{post.date}</p>
        <p>By {post._embedded.author[0].name}</p>
        {!!post._embedded['wp:featuredmedia'] && (
          <img
            width={500}
            src={post._embedded['wp:featuredmedia'][0].source_url}
            alt={post._embedded['wp:featuredmedia'][0].alt_text}
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    )
  }
}

export default withLayout(BlogPost)
