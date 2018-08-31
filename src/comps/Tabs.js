import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const { Provider, Consumer } = React.createContext({});
export default class Tabs extends Component {
  state = {
    tab: '',
    content: '',
  };

  static Tab = ({ title, children }) => (
    <Consumer>
      {({ tab, setTab }) => (
        <NavItem>
          <NavLink
            onClick={() => setTab({ title, children })}
            href="#"
            active={tab === title}
          >
            {title}
          </NavLink>
        </NavItem>
      )}
    </Consumer>
  );

  setTab = ({ title, children }) =>
    this.setState({ tab: title, content: children });

  getProps = () => {
    return {
      ...this.state,
      setTab: this.setTab,
    };
  };

  componentDidMount() {
    if (this.props.children && this.props.children.length > 0) {
      this.setTab(this.props.children[0].props);
    }
  }

  render() {
    return (
      <Provider value={this.getProps()}>
        <Nav tabs>{this.props.children}</Nav>
        <div style={{ padding: '20px' }}>{this.state.content}</div>
      </Provider>
    );
  }
}
