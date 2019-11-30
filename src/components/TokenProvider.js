/**
 *  Copyright (c) 2019 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * TokenProvider
 *
 * What a nice round shiny toggle button and a little input text to insert a bearer token inside your GraphQL Request.
 */
export class TokenProvider extends React.Component {
  static propTypes = {
    addToken: PropTypes.bool,
    onTokenUpdate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state={
      addToken: Boolean(props.addToken),
      token: null
    };
  }

  render() {
    const buttonStyle = {};
    let tokenInput;
    const buttonTitle = 'Include auth token';
    if (this.state.addToken){
        buttonStyle.background = 'linear-gradient(rgb(33, 150, 243), rgb(0, 122, 220))';
        buttonStyle.color = 'white';
        tokenInput = <input type="text" name="token" placeholder="Token" className="form-control" onChange={this.handleChange} value={this.state.token}/>
    }
    return (
      <div className="toolbar">
        <button className={'toolbar-button'} style={buttonStyle} onClick={this.handleClick}>{buttonTitle}</button>
        {tokenInput}
      </div>
    );
  }

  handleClick = () => {
    if(this.state.addToken){
      this.props.onTokenUpdate(null);
    } else {
      this.props.onTokenUpdate(this.state.token);
    }
    this.setState({
      ...this.state,
      addToken: !this.state.addToken
    });
  };

  handleChange = (e) => {
    const token = (e.target.value === '') ? null : e.target.value;
    this.setState({
      ...this.state,
      token
    });
    this.props.onTokenUpdate(token);
  };
}
