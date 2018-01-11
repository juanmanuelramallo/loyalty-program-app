import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NotifyMessage extends Component {
  constructor() {
    super();
    this.state = {
      active: true
    }
  }


  componentDidMount() {
    this.timeout = setTimeout(() => this.close(), 6000);
  }


  close() {
    const { text } = this.props;
    this.setState({ active: false });
    this.removeTimeout = setTimeout(() => this.props.removeMessage(text), 300);
  }


  render() {
    const { text, type } = this.props;
    const { active } = this.state;
    const classNames = `notify-message notify-message-${type} ${active ? '' : 'notify-message-hide'}`;
    return(
      <div className={ classNames }>{ text } <span className="btn-icon notify-message-close" onClick={ () => this.close() }>&#215;</span></div>
    );
  }
}

NotifyMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  removeMessage: PropTypes.func.isRequired
}
