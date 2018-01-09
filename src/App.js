import React, { Component } from 'react';

// Components
import Header from './components/Header';

// Styles
import './stylesheets/App.css';

// API services
import { getUser } from './api/user';

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
  }


  fetchUser() {
    getUser()
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch(error => {
        console.log(error);
      })
  }


  render() {
    const { title, user } = this.state;
    return (
      <div className="App">
        <Header
          title={ title }
          user={ user }/>
      </div>
    );
  }
}

export default App;
