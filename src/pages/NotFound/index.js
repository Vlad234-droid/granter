import { Component } from 'react';
import DOM from './notFound';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.view = DOM;
  }

  componentDidMount() {}

  render() {
    return this.view();
  }
}
export default NotFound;
