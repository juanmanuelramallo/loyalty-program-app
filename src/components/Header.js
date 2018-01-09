import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Coin from './Coin';
import '../stylesheets/header.css';
import logo from '../images/aerolab-logo.svg';

export default class Header extends Component {
  renderUserInfo() {
    const { isLoading, user } = this.props;
    if (isLoading) {
      return(<div className='loading'></div>);
    } else if (user) {
      return(
        <div className='header-info-user'>
          <p className='header-info-user-name'>{ user.name }</p>
          <div className='header-info-user-points'><p>{ user.points }</p><Coin /></div>
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
          <h1 className='header-banner-title'>{ title }</h1>
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
