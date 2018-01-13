import React, { Component } from 'react';

import '../stylesheets/history.css';

import coin from '../images/coin.svg'
import { getHistory } from '../api/user';

import moment from 'moment';

export default class History extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      products: [],
      show: false
    }
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }


  componentDidMount() {
    this.fetchHistory();
    this.el = document.querySelector('.history');
    this.el.className = 'history';
  }


  fetchHistory() {
    getHistory()
      .then(response => {
        this.setState({
          products: response.data.reverse(),
          isLoading: false,
          error: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false,
          error: true
        });
      })
  }


  addProductToHistory(product) {
    let { products } = this.state;
    products.splice(0, 0, product);
    this.setState({
      products
    });
  }


  handleClickOutside(e) {
    const className = e.target.className;
    if ((className.indexOf('history') === -1) && (className.indexOf('header-info-user-points') === -1)) {
      this.hide();
    }
  }


  show() {
    const { show } = this.state;
    if (!show) {
      this.setState({ show: true });
      document.body.addEventListener('click', this.handleClickOutside);
    }
  }


  hide() {
    const { show } = this.state;
    if (show) {
      this.setState({ show: false });
      setTimeout(() => this.el.className = 'history', 250);
      document.body.removeEventListener('click', this.handleClickOutside);
    }
  }


  renderProduct(product, index) {
    return(
      <li key={ `product-history-${index}` } className='history-products-product'>
        <div className='history-products-product-info'>
          <p className='history-products-product-info-category'>{ product.category }</p>
          <p className='history-products-product-info-name'>{ product.name }</p>
          <p className='history-products-product-info-date'>{ moment(product.createDate).format('LLL') }</p>
        </div>
        <div className='history-products-product-cost'>
          <p className='history-products-product-cost-value'>- { product.cost } <img className='history-products-product-cost-coin' src={ coin } alt='Coin'/></p>
        </div>
      </li>
    );
  }


  renderProducts() {
    const { products, isLoading } = this.state;
    if (isLoading) {
      return(
        <div className='loading'></div>
      );
    } else if (products.length > 0) {
      return(
        <ol className='history-products'>
          { products.map((product, index) => this.renderProduct(product, index)) }
        </ol>
      );
    } else {
      return(
        <div className='history-empty'>
          There are no products redeemed
        </div>
      );
    }
  }


  render() {
    const { show } = this.state;
    return(
      <div className={ `history ${ show ? 'fade-in' : 'fade-out' }` } id='history'>
        <div className='history-header'>
          <h1 className='history-header-title'>History</h1>
          <button className='btn-icon' onClick={ () => this.hide() }><span className='close'>✕</span></button>
        </div>
        { this.renderProducts() }
      </div>
    );
  }
}
