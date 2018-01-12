import React, { Component } from 'react';
import PropTypes from 'prop-types';

import buyBlue from '../images/buy-blue.svg';
import buyWhite from '../images/buy-white.svg';
import coin from '../images/coin.svg';

import '../stylesheets/product.css';

import { redeem } from '../api/products';

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      loadingImage: true
    }
  }


  handleRedeemButton() {
    const { product, availablePoints } = this.props;
    if (availablePoints >= product.cost) {
      this.setState({ isLoading: true });
      redeem(product)
        .then(response => {
          this.props.updatePoints();
          this.props.notify({ text: response.data.message, type: 'success' });
          this.setState({ isLoading: false });
        })
        .catch(error => {
          this.props.notify({ text: error, type: 'error' });
          this.setState({ isLoading: false });
        })
    }
  }


  handleLoadedImage() {
    this.setState({ loadingImage: false });
  }


  renderShopIcon(color) {
    const { availablePoints, product } = this.props;
    const pointsNeeded = product.cost - availablePoints;
    if (pointsNeeded > 0) {
      return(
        <div className="product-points-needed">You need { pointsNeeded } <img src={ coin } alt="Coin"/></div>
      );
    } else {
      let buyIcon = buyBlue;
      if (color === 'white') {
        buyIcon = buyWhite;
      }
      return(
        <div className="product-buy"><img src={ buyIcon } alt="Shop"/></div>
      );
    }
  }


  renderProductOverlay() {
    const { availablePoints, product } = this.props;
    if (availablePoints >= product.cost) {
      const { isLoading } = this.state;
      const redeemButtonText = `${ isLoading ? 'Redeeming...' : 'Redeem now' }`;
      return(
        <div className="product-overlay">
          <div className="product-overlay-background"></div>
          { this.renderShopIcon('white') }
          <div className="product-overlay-info">
            <p className="product-overlay-info-points">{ product.cost } <img src={ coin } alt="Coin"/></p>
            <button type='button' className='btn btn-white' onClick={ () => this.handleRedeemButton() }>{ redeemButtonText }</button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }


  render() {
    const { product } = this.props;
    const { loadingImage } = this.state;
    return(
      <div className="product">
        { this.renderShopIcon() }
        <div className={ `product-photo ${ loadingImage ? 'product-photo--loading' : '' }` }><img src={ product.img.url } onLoad={ () => this.handleLoadedImage() } alt={ `${product.category}` } /></div>
        <div className="product-info">
          <p className="product-info-category">{ product.category }</p>
          <p className="product-info-name">{ product.name }</p>
        </div>
        { this.renderProductOverlay() }
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  availablePoints: PropTypes.number.isRequired
}
