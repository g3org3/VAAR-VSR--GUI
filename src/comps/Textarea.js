import React, { PureComponent } from 'react';

const style = {
  fontSize: '20px',
  width: '100%',
  height: '75vh',
  fontFamily: 'monospace',
};

export default class Textarea extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <textarea
        onChange={({ target: { value } } = {}) => this.props.onUpdate(value)}
        className="form-control"
        style={style}
        value={data}
      />
    );
  }
}
