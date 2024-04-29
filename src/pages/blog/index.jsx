import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import BlogView from '../../components/blogView'

const BlogPage = () => {
  return (
    <Layout>
      <div class="h-auto min-h-[100vh]">
        <h1 class="text-black text-center text-6xl font-sans font-bold py-20">Blog Posts</h1>
        <BlogView grid_config={"grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[75vw] mx-auto"} />
      </div>
    </Layout>
  )
}

export const Head = () => <title>Blog</title>

export default BlogPage