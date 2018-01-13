import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotifyMessage from './NotifyMessage';
import '../stylesheets/notify.css';

export default class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages
    }
  }


  notify(message) {
    let { messages } = this.state;
    messages.push(message);
    this.setState({
      messages
    });
  }


  removeMessage(text) {
    let { messages } = this.state;
    let index;
    let messageToRemove = messages.find((m, i) => {
      index = i;
      return m.text === text;
    });
    if (messageToRemove) {
      messages.splice(index, 1);
      this.setState({
        messages
      });
    }
  }


  renderMessage(message, index) {
    return(
      <NotifyMessage text={ message.text } type={ message.type } removeMessage={ (t) => this.removeMessage(t) } key={ `message-${index}`} />
    );
  }


  render() {
    const { messages } = this.state;
    return(
      <div className='notify'>
        { messages.map((message, index) => this.renderMessage(message, index)) }
      </div>
    );
  }
}

Notify.propTypes = {
  messages: PropTypes.array
}

Notify.defaultProps = {
  messages: []
}
