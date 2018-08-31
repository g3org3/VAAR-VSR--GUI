import { PureComponent } from 'react';
import swal from 'sweetalert';

export default class API extends PureComponent {
  state = { data: '' };

  componentDidMount() {
    this.getData(this.props);
  }

  async getData(props) {
    const { endpoint } = props;
    const res = await fetch(`/api${endpoint}`);
    if (res.status < 300) {
      const text =
        res.headers.get('Content-Type') !== 'application/json'
          ? await res.text()
          : await res.json();
      this.setState({ data: text });
    } else {
      swal({
        title: 'Oops',
        text: 'Something went wrong!',
        timer: 2000,
        icon: 'error',
      });
    }
  }

  saveData = async () => {
    const { endpoint } = this.props;
    const { data } = this.state;
    const res = await fetch(`/api${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    if (res.status < 300) {
      swal({
        title: 'Saved! ✨',
        timer: 500,
        icon: 'success',
      });
    } else {
      swal({
        title: 'Oops',
        text: 'Something went wrong!',
        timer: 2000,
        icon: 'error',
        buttons: false,
      });
    }
  };

  onUpdate = data => this.setState({ data });

  componentDidUpdate(props) {
    if (props.endpoint !== this.props.endpoint) {
      this.getData(this.props);
    }
  }

  render() {
    const { children } = this.props;
    const { data } = this.state;
    const { saveData, onUpdate } = this;
    return children({ data, saveData, onUpdate });
  }
}
