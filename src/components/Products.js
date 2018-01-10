import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import '../stylesheets/header.css';

import Product from './Product';

export default class Products extends Component {
  constructor(props) {
    super(props);
    const currentProducts = this.currentProducts(props);
    this.state = {
      currentProducts
    };
  }


  componentWillReceiveProps(nextProps) {
    if (this.state.page !== nextProps.page) {
      const currentProducts = this.currentProducts(nextProps);
      this.setState({
        currentProducts
      });
    }
  }


  currentProducts(props) {
    const { page, productsPerPage, products } = props;
    const start = (page - 1) * productsPerPage;
    const end = page * productsPerPage;
    return products.slice(start, end);
  }


  renderProduct(product) {
    const { availablePoints } = this.props;
    return(
      <div className="product-col" key={ `product-${product._id}` }>
        <Product product={ product } availablePoints={ availablePoints }/>
      </div>
    );
  }


  render() {
    const { currentProducts } = this.state;
    return(
      <div className="products">
        { currentProducts.map(product => this.renderProduct(product))}
      </div>
    );
  }
}

Products.propTypes = {
  page: PropTypes.number.isRequired,
  productsPerPage: PropTypes.number.isRequired,
  products: PropTypes.array,
  availablePoints: PropTypes.number.isRequired
}

Products.defaultProps = {
  page: 1,
  productsPerPage: 0,
  products: [],
  availablePoints: 0
}
