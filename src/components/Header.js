import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/header.css';

import logo from '../images/aerolab-logo.svg';
import coin from '../images/coin.svg';

export default class Header extends Component {
  handleOpenHistory() {
    this.props.showHistory();
  }


  renderUserInfo() {
    const { isLoading, user } = this.props;
    if (isLoading) {
      return(<div className='loading'></div>);
    } else if (user) {
      return(
        <div className='header-info-user'>
          <p className='header-info-user-name'>{ user.name }</p>
          <div className='header-info-user-points' onMouseOver={ () => this.handleOpenHistory() }>
            <p className='header-info-user-points-value'>{ user.points }</p>
            <img className='header-info-user-points-coin' src={ coin } alt='Coin'/>
        </div>
        </div>
      );
    } else {
      return null;
    }
  }


  render() {
    const { title } = this.props;
    return(
      <header className='header'>
        <div className='header-info'>
          <img src={ logo } alt='Kite' className='header-info-logo'/>
          { this.renderUserInfo() }
        </div>
        <div className='header-banner'>
          <div className='container'>
            <div className='header-banner-title'>{ title }</div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  user: PropTypes.object
}
