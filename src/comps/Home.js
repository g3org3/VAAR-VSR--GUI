import React, { PureComponent } from 'react';
import swal from 'sweetalert';

export default class Home extends PureComponent {
  state = {
    data: '',
  };

  run = async e => {
    e.preventDefault();
    this.setState({ data: '' });
    let finish = false;
    let loading = false;
    setTimeout(() => {
      if (!finish) {
        loading = true;
        swal({
          title: 'Loading...',
          icon: 'info',
        });
      }
    }, 1200);
    const res = await fetch('/api/run');
    finish = true;
    if (res.status < 300) {
      const data = await res.text();
      this.setState({ data });
      if (loading) {
        swal({
          title: 'Done! ✨',
          timer: 1000,
          icon: 'success',
        });
      }
    } else {
      swal({
        title: 'Oops',
        text: 'Something went wrong!',
        timer: 2000,
        icon: 'error',
      });
    }
  };

  render() {
    return (
      <div>
        <button className="btn btn-info" onClick={this.run}>
          RUN{' '}
          <span aria-label="fire" role="img">
            🔥
          </span>
        </button>
        <button
          style={{ marginLeft: '10px' }}
          className="btn btn-warning"
          onClick={this.props.togglePane}
        >
          {this.props.sidepane ? 'hide menu' : 'show menu'}
        </button>
        <hr />
        <pre style={{ fontSize: '22px', height: '85vh' }}>
          {this.state.data}
        </pre>
      </div>
    );
  }
}
