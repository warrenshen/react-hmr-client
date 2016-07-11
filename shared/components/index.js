import React from 'react';

export default class ClientRoot extends React.Component {
  render() {
    return (
      <div id='client-root'>
        <h1>Client</h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
