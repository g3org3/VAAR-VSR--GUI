import React, { Component } from 'react';
import MainViewer from './components/organisms/MainViewer';
import styled from 'styled-components';

const Div = styled.div`
  background: #333;
  color: white;
  font-family: Source Code Pro, monospace;
  height: 80vh;
`;
const isJSON = code => {
  try {
    return JSON.parse(code);
  } catch (e) {
    return false;
  }
};

class App extends Component {
  render() {
    const {
      code: { custom_rules },
    } = this.props;
    const quitReason = (isJSON(this.props.code) || {}).quitReason;
    if (!custom_rules && !quitReason) return <pre>no data</pre>;
    const code =
      typeof this.props.code === 'object'
        ? JSON.stringify(this.props.code || {})
        : this.props.code;
    return (
      <Div>
        <MainViewer code={code} />
      </Div>
    );
  }
}

export default App;
