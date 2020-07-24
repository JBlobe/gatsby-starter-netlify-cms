import React from 'react'
import PropTypes from 'prop-types'

const BuyButton = class extends React.Component {
  render() {
    const { price, text } = this.props
    return (
      <button>{text} - {price} €</button>
    )
  }
}
BuyButton.propTypes = {
  price: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default BuyButton
