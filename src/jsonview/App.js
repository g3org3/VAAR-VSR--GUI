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
  if (typeof code === 'object') return code;
  try {
    return JSON.parse(code);
  } catch (e) {
    return false;
  }
};

class App extends Component {
  render() {
    const code = isJSON(this.props.code) || {};
    if (Object.keys(code).length < 1) return <pre>no data</pre>;
    const data = JSON.stringify(code);
    return (
      <Div>
        <MainViewer code={data} />
      </Div>
    );
  }
}

export default App;
