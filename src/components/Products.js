import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import '../stylesheets/header.css';
import '../stylesheets/products.css';

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
      <Product
        product={ product }
        availablePoints={ availablePoints }
        notify={ (m) => this.props.notify(m) }
        updateUserPoints={ (p) => this.props.updateUserPoints(p) }
        updateHistory={ (p) => this.props.updateHistory(p) }
        key={ `product-${product._id}` }/>
    );
  }


  render() {
    const { currentProducts } = this.state;
    return(
      <div className='products'>
        { currentProducts.map(product => this.renderProduct(product))}
      </div>
    );
  }
}

Products.propTypes = {
  page: PropTypes.number.isRequired,
  productsPerPage: PropTypes.number.isRequired,
  availablePoints: PropTypes.number.isRequired,
  updateUserPoints: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired,
  products: PropTypes.array,
  notify: PropTypes.func
}

Products.defaultProps = {
  page: 1,
  productsPerPage: 0,
  products: [],
  availablePoints: 0
}
