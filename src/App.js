import React, { Component } from 'react';

// Components
import Header from './components/Header';
import Filters from './components/Filters';

// Styles
import './stylesheets/App.css';

// API services
import { getUser } from './api/user';
import { getProducts } from './api/products';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Electronics'
    }
    sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTUzOTIyZGM5NzYyYTAwNTc2Mzg5MzYiLCJpYXQiOjE1MTU0MjYzNDl9.a_fFPJXHXg6Nz9SqCAiTXxt6qYBkKeOdphuR_PJcQbQ')
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


  handlePage(page) {
    this.setState({ page });
  }


  handleFilter(filter) {
    this.setState({ appliedFilter: filter });
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
        handleFilter={ (filter) => this.handleFilter(filter) }/>
    );
  }


  render() {
    const { title, user } = this.state;
    return (
      <div className="App">
        <Header
          title={ title }
          user={ user }/>
        <div className="container">
          { this.renderFiltersBar(true) }
          <p>content</p>
          { this.renderFiltersBar(false) }
        </div>
      </div>
    );
  }
}

export default App;
