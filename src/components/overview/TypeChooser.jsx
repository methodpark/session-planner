import React from 'react';

export default class TypeChooser extends React.Component {
  render() {
    return (
      <div id="typeChooser">
        <span onClick={() => this.props.onChange('tracks')} className={this.props.what === 'tracks' ? 'active' : ''}>tracks</span>
        {" | "}
        <span onClick={() => this.props.onChange('slots')} className={this.props.what === 'slots' ? 'active' : ''}>slots</span>
      </div>
    );
  }
}