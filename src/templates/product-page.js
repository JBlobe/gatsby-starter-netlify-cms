import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Features from '../components/Features'
import BuyButton from '../components/BuyButton'

export const ProductPageTemplate = ({
  image,
  title,
  description,
  intro,
  buttonText,
  price,
}) => (
  <div className="content">
    <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
      }}
    >
      <h2
        className="has-text-weight-bold is-size-1"
        style={{
          boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
          backgroundColor: '#f40',
          color: 'white',
          padding: '1rem',
        }}
      >
        {title}
      </h2>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-7 is-offset-1">
              <p>{description}</p>
              </div>
          </div>
          <div className="column is-7 is-offset-1">
              <BuyButton price={price} text={buttonText} />
          </div>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Features gridItems={intro.blurbs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  buttonText: PropTypes.string,
  price: PropTypes.string,
}

class ProductPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      price: '',
    }
  }

  componentDidMount() {
    this.fetchPrice()
  }

  fetchPrice = () => {
    return fetch('https://products-dev.bemer.services/en_US/shop/v1/products/420200')
      .then(resp => resp.json())
      .then(({ price: { amount } }) => this.setState({ price: amount }))
  }

  render() {
    const { frontmatter } = this.props.data.markdownRemark
    const {price} = this.state
    return (
      <Layout>
        <ProductPageTemplate
          image={frontmatter.image}
          title={frontmatter.title}
          heading={frontmatter.heading}
          description={frontmatter.description}
          intro={frontmatter.intro}
          buttonText={frontmatter.buttonText}
          price={price}
        />
      </Layout>
    )
  }
}

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ProductPage

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
        buttonText
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            headline
            text
          }
        }
      }
    }
  }
`
