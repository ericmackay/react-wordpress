import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Waypoint from 'react-waypoint'

import api from '../api'
import withLayout from '../components/withLayout'

const PER_PAGE = 10

class Blog extends React.Component {
  state = {
    page: 1,
    loading: false,
    hasMore: true
  }

  static async getInitialProps() {
    const posts = await api
      .posts()
      .perPage(PER_PAGE)
      .page(1)
      .embed()
    return { posts }
  }

  loadMore = async () => {
    if (this.state.loading || !this.state.hasMore) {
      return
    }

    this.setState({ loading: true })
    const posts = await api
      .posts()
      .perPage(PER_PAGE)
      .page(this.state.page + 1)
      .embed()
    if (posts.length > 0) {
      this.setState({
        posts: this.state.posts.concat(posts),
        page: this.state.page + 1
      })
    } else {
      this.setState({ hasMore: false })
    }
    this.setState({
      loading: false
    })
  }

  componentWillMount = () => {
    this.setState({ posts: this.props.posts })
  }

  render() {
    const { posts } = this.state

    return (
      <div>
        <Head>
          <title>Welcome to my site</title>
        </Head>
        <h1>Recent blog posts</h1>
        {posts.map(post => (
          <div key={post.id}>
            <Link
              href={{ pathname: '/blogpost', query: { slug: post.slug } }}
              as={`/blog/${post.slug}`}
            >
              <a>
                <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              </a>
            </Link>
            <p>{post.date}</p>
            {!!post._embedded['wp:featuredmedia'] && (
              <img
                width={500}
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post._embedded['wp:featuredmedia'][0].alt_text}
              />
            )}
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </div>
        ))}
        {this.state.hasMore && (
          <Waypoint key={this.state.page} onEnter={this.loadMore} />
        )}
        {this.state.loading && <p>loading...</p>}
      </div>
    )
  }
}

export default withLayout(Blog)
