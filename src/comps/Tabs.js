import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const { Provider, Consumer } = React.createContext({});
export default class Tabs extends Component {
  static defaultProps = {
    bordered: false,
    pills: false,
    tabs: false,
    onSetTab: () => {},
  };

  state = {
    tab: '',
    content: '',
  };

  static Consumer = Consumer;

  static Tab = ({ title = '', children }) => (
    <Consumer>
      {({ tab, setTab }) => (
        <NavItem>
          <NavLink
            onClick={() => setTab({ title, children })}
            href="javascript:void(0);"
            active={tab === title}
          >
            {title}
          </NavLink>
        </NavItem>
      )}
    </Consumer>
  );

  setTab = ({ title, children }) => {
    const { onSetTab } = this.props;
    this.setState({ tab: title, content: children });
    return (
      typeof onSetTab === 'function' &&
      onSetTab({ tab: title, content: children })
    );
  };

  setTabN = index => this.setTab(this.props.children[index].props);

  getProps = () => {
    return {
      ...this.state,
      setTab: this.setTab,
    };
  };

  componentDidMount() {
    // bindif
    if (typeof this.props.bindSetTabN === 'function') {
      this.props.bindSetTabN(this.setTabN);
    }
    // set the first tab active
    const {
      children: { length },
      children,
    } = this.props;
    if (!children) return;
    if (!length) {
      this.setTab(children.props);
    } else if (length > 0) {
      this.setTab(children[0].props);
    }
  }

  render() {
    const { pills, tabs } = this.props;
    const props = {
      pills,
      tabs,
    };
    return (
      <Provider value={this.getProps()}>
        <Nav {...props}>{this.props.children}</Nav>
        <div style={style(this.props.bordered)}>{this.state.content}</div>
      </Provider>
    );
  }
}

function style(bordered) {
  return bordered
    ? {
        borderLeft: '1px solid #ddd',
        borderRight: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
        padding: '20px',
      }
    : { padding: '20px' };
}
