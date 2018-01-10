import React, { Component } from 'react';
import PropTypes from 'prop-types';

import buyBlue from '../images/buy-blue.svg';
import buyWhite from '../images/buy-white.svg';
import coin from '../images/coin.svg';

import '../stylesheets/product.css';

export default class Product extends Component {
  render() {
    const { product, availablePoints } = this.props;
    return(
      <div className="product">
        <div className="product-buy"><button><img src={ buyBlue } alt="Buy"/></button></div>
        <div className="product-photo"><img src={ product.img.url } alt={ `${product.category}` } /></div>
        <div className="product-info">
          <p className="product-info-category">{ product.category }</p>
          <p className="product-info-name">{ product.name }</p>
        </div>
        <div className="product-hover">
          <div className="product-buy"><button><img src={ buyWhite } alt="Buy"/></button></div>
          <div className="product-hover-info">
            <p className="product-hover-info-points">{ product.cost } <img src={ coin } alt="Coin"/></p>
            <button type='button' className={ `btn btn-white ${ availablePoints > product.cost ? '' : 'disabled'}` }>Redeem now</button>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  availablePoints: PropTypes.number.isRequired
}
