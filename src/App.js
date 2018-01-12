import React, { Component } from 'react';

// Components
import Header from './components/Header';
import Filters from './components/Filters';
import Products from './components/Products';
import Notify from './components/Notify';
import History from './components/History';

// Styles
import './stylesheets/App.css';

// API services
import { getUser, addPoints } from './api/user';
import { getProducts } from './api/products';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Electronics'
    }
    sessionStorage.setItem('token', process.env.REACT_APP_API_KEY);
  }


  componentDidMount() {
    this.fetchUser();
    this.fetchProducts();
  }


  fetchUser() {
    this.setState({ userLoading: true });
    getUser()
      .then(response => {
        this.setState({ user: response.data, userLoading: false });
      })
      .catch(error => {
        this.setState({ userLoading: false });
        console.log(error);
      })
  }


  fetchProducts() {
    this.setState({ productsLoading: true });
    getProducts()
      .then(response => {
        const products = response.data;
        const totalProducts = products.length;
        const page = 1;
        const productsPerPage = 16;
        const appliedFilter = 'mostRecent';
        this.setState({ products, totalProducts, page, productsPerPage, appliedFilter, productsLoading: false });
      })
      .catch(error => {
        this.setState({ productsLoading: false });
        console.log(error);
      })
  }


  updateUserPoints(pointsSpent) {
    let { user } = this.state;
    user.points = user.points - pointsSpent;
    this.setState({
      user
    });
  }


  // To use with the react dev tools and dev console
  handleAddPoints() {
    addPoints()
      .then(response => console.log(response.data))
      .catch(error => console.log(error))
  }


  handlePage(page) {
    this.setState({ page });
  }


  handleFilter(filter) {
    let { products } = this.state;
    switch (filter) {
      case 'mostRecent':
        // There is no 'created at' information about a product
        break;
      case 'lowestPrice':
        products = products.sort((productA, productB) => productA.cost - productB.cost);
        break;
      case 'highestPrice':
        products = products.sort((productA, productB) => productB.cost - productA.cost);
        break;
      default:
        break;
    }

    this.setState({
      products,
      appliedFilter: filter,
      page: 1
    });
  }


  showHistory() {
    this.refs.history.show();
  }


  renderFiltersBar(withFilters) {
    const { page, totalProducts, productsPerPage, appliedFilter, productsLoading } = this.state;
    return(
      <Filters
        page={ page }
        totalProducts={ totalProducts }
        productsPerPage={ productsPerPage }
        appliedFilter={ appliedFilter }
        withFilters={ withFilters }
        isLoading={ productsLoading }
        handlePage={ (page) => this.handlePage(page) }
        handleFilter={ (filter) => this.handleFilter(filter) } />
    );
  }


  renderProducts() {
    const { page, products, productsPerPage, appliedFilter, productsLoading, user } = this.state;
    if (products && user) {
      const availablePoints = user.points;
      return(
        <Products
          products={ products }
          page={ page }
          productsPerPage={ productsPerPage }
          appliedFilter={ appliedFilter }
          availablePoints={ availablePoints }
          notify={ (m) => this.refs.notify.notify(m) }
          updateUserPoints={ (p) => this.updateUserPoints(p) }
          updateHistory={ (p) => this.refs.history.addProductToHistory(p) }/>
      );
    } else if (productsLoading) {
      return(<div className="loading"></div>);
    } else {
      return null;
    }
  }


  render() {
    const { title, user } = this.state;
    return (
      <div className="App">
        <Header
          title={ title }
          user={ user }
          showHistory={ () => this.showHistory() } />
        <History ref='history'/>
        <main className="container">
          { this.renderFiltersBar(true) }
          { this.renderProducts() }
          { this.renderFiltersBar(false) }
        </main>
        <Notify ref='notify'/>
      </div>
    );
  }
}

export default App;
