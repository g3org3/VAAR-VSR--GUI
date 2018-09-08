import React, { Fragment, PureComponent } from 'react';
import Tabs from './comps/Tabs';
import API from './comps/API';
import Textarea from './comps/Textarea';
import Home from './comps/Home';
import JSONView from './jsonview/App';
const ShowIf = ({ value, children }) => (value ? children : null);
const VERSION = process.env.REACT_APP_VERSION;

export default class App extends PureComponent {
  state = {
    sidepane: true,
    tab: '',
    tabsSaveable: ['/rules', '/tosca-conf', '/config'],
    contents: {},
    saveData: () => console.log('savedata: not binded'),
    runFN: () => console.log('run: not binded'),
    setTabN: () => console.log('settabn: not binded'),
  };

  componentDidMount() {
    const truncateAt = 4;
    let pressedKeys = [];
    const getLastN = (a, n) => a.slice(a.length - n);
    const _ = k => (k.length === 1 ? `Key${k}` : k);
    const mactrans = k => (k === '*' ? 'MetaLeft' : _(k));
    const wintrans = k => (k === '*' ? 'ControlLeft' : _(k));
    const isPatternMatched = (pattern, keys) => {
      const mac = keys.map(mactrans).join('-');
      const win = keys.map(wintrans).join('-');
      return pattern === mac || pattern === win;
    };
    const isPatternAnyDigit = (pattern, digits) => {
      const foundMac = digits
        .map(d => pattern === ['*', `Digit${d}`].map(mactrans).join('-'))
        .filter(Boolean);
      if (foundMac.length === 1) return true;
      const foundWin = digits
        .map(d => pattern === ['*', `Digit${d}`].map(wintrans).join('-'))
        .filter(Boolean);
      return foundWin.length === 1;
    };
    document.onkeydown = e => {
      const { code, key } = e;

      // add to our history of pressed keys
      pressedKeys.push(code);

      // truncate array if length is over N
      if (pressedKeys.length > truncateAt)
        pressedKeys = getLastN(pressedKeys, truncateAt);

      // create a pattern: join last 3 pressed keys
      const keys = getLastN(['', '', ...pressedKeys], 2);
      const pattern2 = keys.join('-');
      const pattern3 = getLastN(['', '', '', ...pressedKeys], 3).join('-');

      // check pattern: CMD+K+B
      if (isPatternMatched(pattern3, ['*', 'K', 'B'])) {
        this.togglePane();
      } else if (isPatternMatched(pattern2, ['*', 'S'])) {
        e.preventDefault();
        const data = this.state.contents[`/${this.state.tab}`];
        if (data) {
          //save
          console.log(`saving ${this.state.tab} ...`);
          this.state.saveData();
        }
      } else if (isPatternMatched(pattern2, ['*', 'R'])) {
        e.preventDefault();
        console.log(`running ...`);
        this.state.runFN();
      } else if (isPatternAnyDigit(pattern2, [1, 2, 3, 4, 5, 6, 7])) {
        e.preventDefault();
        this.state.setTabN(Number(key) - 1);
      }
    };
  }

  togglePane = () => this.setState(s => ({ ...s, sidepane: !s.sidepane }));
  onSetTab = ({ tab }) => this.setState({ tab });
  bindSetTabn = setTabN => this.setState({ setTabN });
  bindSave = saveData => this.setState({ saveData });
  bindRun = runFN => this.setState({ runFN });
  bindStateData = ({ endpoint, data }) => {
    if (this.state.tabsSaveable.indexOf(endpoint) === -1) {
      return;
    }
    this.setState(s => ({
      ...s,
      contents: {
        ...s.contents,
        [endpoint]: data,
      },
    }));
  };

  render() {
    const { sidepane } = this.state;
    return (
      <Fragment>
        <div style={{ padding: '40px' }}>
          <div className="row">
            <div
              className={sidepane ? 'col-sm-3' : 'col-sm-12'}
              style={{ height: '90vh' }}
            >
              <Home
                bindRun={this.bindRun}
                sidepane={sidepane}
                togglePane={this.togglePane}
              />
            </div>
            <ShowIf value={sidepane}>
              <div
                className="col-sm-9"
                style={{ borderLeft: 'solid #aaa 1px', height: '90vh' }}
              >
                <Tabs
                  bindSetTabN={this.bindSetTabn}
                  onSetTab={this.onSetTab}
                  pills
                >
                  <Tabs.Tab title="home">
                    <h2>Welcome v{VERSION}</h2>
                  </Tabs.Tab>
                  <Tabs.Tab title="tosca-conf">
                    <API
                      endpoint="/tosca-conf"
                      bindSave={this.bindSave}
                      onData={this.bindStateData}
                    >
                      {({ data, saveData, onUpdate }) => (
                        <Fragment>
                          <button
                            className="btn btn-light btn-block"
                            onClick={saveData}
                          >
                            save
                          </button>
                          <hr />
                          <Textarea data={data} onUpdate={onUpdate} />
                        </Fragment>
                      )}
                    </API>
                  </Tabs.Tab>
                  <Tabs.Tab title="rules">
                    <API
                      endpoint="/rules"
                      bindSave={this.bindSave}
                      onData={this.bindStateData}
                    >
                      {({ data, saveData, onUpdate }) => (
                        <Fragment>
                          <button
                            className="btn btn-light btn-block"
                            onClick={saveData}
                          >
                            save
                          </button>
                          <hr />
                          <Textarea data={data} onUpdate={onUpdate} />
                        </Fragment>
                      )}
                    </API>
                  </Tabs.Tab>
                  <Tabs.Tab title="config">
                    <API
                      endpoint="/config"
                      bindSave={this.bindSave}
                      onData={this.bindStateData}
                    >
                      {({ data, saveData, onUpdate }) => (
                        <Fragment>
                          <button
                            className="btn btn-light btn-block"
                            onClick={saveData}
                          >
                            save
                          </button>
                          <hr />
                          <Textarea data={data} onUpdate={onUpdate} />
                        </Fragment>
                      )}
                    </API>
                  </Tabs.Tab>
                  <Tabs.Tab title="output.smt">
                    <API endpoint="/output.smt" onData={this.bindStateData}>
                      {({ data, onUpdate }) => (
                        <Textarea data={data} onUpdate={onUpdate} />
                      )}
                    </API>
                  </Tabs.Tab>
                  <Tabs.Tab title="maindata.json">
                    <API endpoint="/maindata.json" onData={this.bindStateData}>
                      {({ data }) => <JSONView code={data} />}
                    </API>
                  </Tabs.Tab>
                  <Tabs.Tab title="output.json">
                    <API endpoint="/output.json" onData={this.bindStateData}>
                      {({ data }) => <JSONView code={data} />}
                    </API>
                  </Tabs.Tab>
                </Tabs>
              </div>
            </ShowIf>
          </div>
        </div>
      </Fragment>
    );
  }
}
