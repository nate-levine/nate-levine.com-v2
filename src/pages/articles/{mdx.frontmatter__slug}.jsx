import * as React from 'react'
import { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import ArticleView  from '../../components/articleView'
import ArticleTags from '../../components/articleTags'
import * as Components from '../../components/mdx/mdx_components'

const ArticlePost = ({ data, children }) => {
  const [tableOfContents, setTableOfContents] = useState()
  const [activeSection, setActiveSection] = useState()
  console.log(activeSection)

  const image = getImage(data.mdx.frontmatter.hero_image)

  const firstThree = (nodes) => {
    return nodes.slice(0, 3)
  }

  useEffect(() => {
    const contents = Array.from(document.querySelectorAll(".section, .subsection"))
    
    setTableOfContents(
      <div class="font-sans font-regular text-xl space-y-1">
        {
          contents.map(section => (
            <ul>
              {/* Scroll behavior */}
              <button type="button" onClick={() =>
                window.scroll({
                  top: section.children[0].offsetTop + 5,
                  behavior: 'smooth'
                })
              }>
                {
                  section.className == "section"
                  ?
                  <li class="text-left ml-0">
                    {
                      section.children[0] == activeSection ?
                      <div class="text-primary bg-black p-3 my-5 rounded-lg shadow-[8px_8px_0_-2px_#fbf1c7,8px_8px_0_black] duration-100">{section.children[0].innerText}</div> :
                      <div class="p-1 duration-100">{section.children[0].innerText}</div>
                    }
                  </li>
                  :
                  <li class="list-disc text-left ml-8">
                    {
                      section.children[0] == activeSection ?
                      <div class="text-primary bg-black p-3 my-5 rounded-lg shadow-[8px_8px_0_-2px_#fbf1c7,8px_8px_0_black] duration-100">{section.children[0].innerText}</div> :
                      <div class="p-1 duration-100">{section.children[0].innerText}</div>
                    }
                  </li>
                }
              </button>
            </ul>
          ))
        }
      </div>
    )

    let options = {
      root: null,
      rootMargin: "0% 0% -100% 0%",
      threshold: 0.0,
    }
    const observer = new IntersectionObserver(
      (contents) => {
        contents.forEach((section) => {
          if (section.isIntersecting) {
            setActiveSection(section.target.children[0])
          }
        })
      },
      options
    )

    contents.forEach((section) => {
      observer.observe(section);
    })

    return () => {
      contents.forEach((section) => {
        observer.unobserve(section);
      })
    }

  }, [activeSection])

  return (
    <Layout>
      <div class="pt-20 max-w-[85%] sm:w-[640px] mx-auto">
        <h1 class="text-black text-4xl font-serif font-bold">{data.mdx.frontmatter.title}</h1>
        <div class="h-8" />
        <p class="text-black max-text-2xl font-sans font-regular">{data.mdx.frontmatter.date}</p>
        <div class="h-8" />
        <ArticleTags tags={data.mdx.frontmatter.tags} isFeatured={data.mdx.frontmatter.isFeatured} />
      </div>
      <div class="h-8 border-dashed border-black border-b-2" />
      <div class="flex flex-col-reverse xl:flex-row pb-20">
        <div class="w-[25%]" />
        <div class="h-auto min-h-[100vh] max-w-[85%] sm:w-[640px] mx-auto">
          <div class="text-black text-2xl text-left font-serif mx-auto pb-10 leading-relaxed">   
            <div class="text-center pt-10">    
            {
              image
              ?
              <GatsbyImage
                image={image}
                alt={data.mdx.frontmatter.hero_image_alt}
                class="rounded-md border-solid border-black border-2 shadow-[8px_8px_0_black]"
              />
              :
              <div />
            }
              <sub>
                <Components.ExternalLink endpoint={data.mdx.frontmatter.hero_image_credit_link}>
                  {data.mdx.frontmatter.hero_image_alt}
                </Components.ExternalLink>
              </sub>
            </div>
            {children}
          </div>
        </div>
        <div class="xl:absolute xl:sticky xl:top-0 h-fit pt-10 xl:pb-14 mx-auto max-w-[85%] w-[640px] xl:w-[25%] xl:max-w-full xl:mr-auto">
          <div class="mx-auto xl:w-[85%]">
            <p class="font-sans font-bold text-2xl pb-3">Table of Contents</p>
            {tableOfContents}
          </div>
        </div>
      </div>
      <div class="border-solid border-black border-b-2" />
      <div class="h-fit"> 
        <div class="py-20 max-w-[75vw] mx-auto">
          <p class="font-bold text-4xl pb-10">Related Articles</p>
          <ArticleView grid_config={"grid md:grid-cols-1 lg:grid-cols-3 gap-6"} filter={firstThree} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
        tags
        isFeatured
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => <title>{data.mdx.frontmatter.title}</title>

export default ArticlePost