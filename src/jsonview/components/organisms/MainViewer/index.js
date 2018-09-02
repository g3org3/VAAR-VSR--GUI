import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import TabsHOC from '../../hocs/TabsHOC';
import EditorActionPaneLayout from '../../templates/EditorActionPaneLayout';
import ObjectVisualizer from '../ObjectVisualizer';
import JSONTree from './JSONTree';
import MainWrapper from './MainWrapper';

const isJSON = code => {
  try {
    JSON.parse(code);
    return true;
  } catch (e) {
    return false;
  }
};

export default TabsHOC(['tree', 'graph', 'repl'], 'tree')(
  class MainViewer extends Component {
    static propTypes = {
      code: PropTypes.string.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        data: isJSON(props.code) ? JSON.parse(props.code) : {},
        isShowingCurrentCode: true,
      };
    }

    componentDidUpdate(prevProps) {
      if (prevProps.code !== this.props.code) {
        console.log('UPDATE');
        this.setState({
          data: isJSON(this.props.code) ? JSON.parse(this.props.code) : {},
          isShowingCurrentCode: true,
        });
      }
    }

    renderMain = _ => {
      console.log('MainViewer.renderMain>', this.props);
      const { code } = this.props;
      const { activeTab } = this.props;

      let data = code === '' ? {} : this.state.data;
      let main = null;

      switch (activeTab) {
        case 'tree':
        default:
          main = <JSONTree data={data} />;
          break;
        case 'graph':
          main = <ObjectVisualizer data={data} />;
          break;
        case 'repl':
          break;
      }

      return main;
    };

    renderButton = (k, label) => {
      const { onTriggerTab, activeTab } = this.props;
      return (
        <Button onClick={onTriggerTab[k]} active={activeTab === k}>
          {label}
        </Button>
      );
    };

    render() {
      console.log('MainViwer.render>', this.props);
      const { renderMain, renderButton } = this;
      return (
        <EditorActionPaneLayout
          title={
            <div>
              {renderButton('tree', 'Tree')}
              {renderButton('graph', 'Graph')}
            </div>
          }
          main={<MainWrapper>{renderMain()}</MainWrapper>}
        />
      );
    }
  },
);
