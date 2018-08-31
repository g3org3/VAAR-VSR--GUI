import React, { Fragment, PureComponent } from 'react';
import Tabs from './comps/Tabs';
import API from './comps/API';
import Textarea from './comps/Textarea';
import Home from './comps/Home';
const ShowIf = ({ value, children }) => (value ? children : null);

const style = {
  fontSize: '20px',
  width: '100%',
  height: '75vh',
  fontFamily: 'monospace',
  border: '1px solid #ddd',
};

export default class App extends PureComponent {
  state = {
    sidepane: true,
    data: '',
    callback: () => ({}),
  };

  componentDidMount() {
    document.onkeypress = ({ code, altKey }) => {
      if (code === 'Backquote') {
        this.togglePane();
      }
    };
  }

  togglePane = () => this.setState(s => ({ ...s, sidepane: !s.sidepane }));

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
              <Home sidepane={sidepane} togglePane={this.togglePane} />
            </div>
            <ShowIf value={sidepane}>
              <div
                className="col-sm-9"
                style={{ borderLeft: 'solid #aaa 1px', height: '90vh' }}
              >
                <Tabs>
                  <Tabs.Tab title="home">
                    <h2>Welcome v1.0.0</h2>
                  </Tabs.Tab>
                  <Tabs.Tab title="tosca-conf">
                    <API endpoint="/tosca-conf">
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
                    <API endpoint="/rules">
                      {({ data, saveData, onUpdate }) => (
                        <Fragment>
                          <button
                            className="btn btn-light btn-block"
                            onClick={() => {
                              document.onkeypress = ({ code }) =>
                                code === 'Backquote' ? this.togglePane() : null;
                              saveData();
                            }}
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
                    <API endpoint="/config">
                      {({ data, saveData, onUpdate }) => (
                        <Fragment>
                          <button
                            className="btn btn-light btn-block"
                            onClick={() => {
                              document.onkeypress = ({ code }) =>
                                code === 'Backquote' ? this.togglePane() : null;
                              saveData();
                            }}
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
                    <API endpoint="/output.smt">
                      {({ data, onUpdate }) => (
                        <Textarea data={data} onUpdate={onUpdate} />
                      )}
                    </API>
                  </Tabs.Tab>
                  <Tabs.Tab title="maindata.json">
                    <API endpoint="/maindata.json" json>
                      {({ data, onUpdate }) => (
                        <pre style={style}>{JSON.stringify(data, null, 2)}</pre>
                      )}
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
