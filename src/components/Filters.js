import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/filters.css';
import arrowLeft from '../images/arrow-left.svg';
import arrowRight from '../images/arrow-right.svg';

export default class Filters extends Component {
  handlePage(direction) {
    let { page } = this.props;
    if (direction === 'left') {
      page = page - 1;
    } else {
      page = page + 1;
    }
    this.props.handlePage(page);
  }


  renderNumbering() {
    const { page, productsPerPage, totalProducts } = this.props;
    const index = page * productsPerPage;
    return(`${index} of ${totalProducts} products`);
  }


  renderPaginationButtons() {
    const { page, productsPerPage, totalProducts } = this.props;
    const canGoRight = (page * productsPerPage) < totalProducts;
    const canGoLeft = page > 1;
    return(
      <div className='pagination-buttons'>
        { canGoLeft &&
            <button onClick={ () => this.handlePage('left') } className='btn-icon'><img src={ arrowLeft } alt='Left'/></button> }
        { canGoRight &&
          <button onClick={ () => this.handlePage('right') } className='btn-icon'><img src={ arrowRight } alt='Right'/></button> }
      </div>
    );
  }


  renderFilter(filter, displayName) {
    const { appliedFilter } = this.props;
    return(
      <button
        type='button'
        className={ `btn ${appliedFilter === filter ? 'active' : ''}` }
        onClick={ () => this.props.handleFilter(filter) }>
        { displayName }
      </button>
    );
  }


  renderFilterButtons() {
    const { withFilters, totalProducts } = this.props;
    if (withFilters && totalProducts > 0) {
      return(
        <div className='filter-buttons'>
          <span className='filter-buttons-divider'></span>
          <span className='filter-buttons-sort-by'>Sort by:</span>
          { this.renderFilter('mostRecent', 'Most recent') }
          { this.renderFilter('lowestPrice', 'Lowest price') }
          { this.renderFilter('highestPrice', 'Highest price') }
        </div>
      );
    } else {
      return null;
    }
  }


  render() {
    return(
      <div className='filters'>
        <div className='filters-left'>
          <span className='filters-products'>{ this.renderNumbering() }</span>
          { this.renderFilterButtons() }
        </div>
        <div className='filters-right'>
          { this.renderPaginationButtons() }
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  page: PropTypes.number.isRequired,
  productsPerPage: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  appliedFilter: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  withFilters: PropTypes.bool,
  handlePage: PropTypes.func.isRequired
}

Filters.defaultProps = {
  page: 0,
  productsPerPage: 0,
  totalProducts: 0,
  appliedFilter: 'mostRecent',
}
