import React, {PropTypes} from 'react';
import {Icon} from '.';

export default React.createClass({

  propTypes: {
    label: PropTypes.string,
    boxCount: PropTypes.number,
    interval: PropTypes.number,
  },
  getDefaultProps: function() {
    return {
      label: 'fetching',
      boxCount: 5,
      interval: 200,
    };
  },
  getInitialState: function() {
    return {
      timer: null,
      count: -1,
    };
  },
  componentDidMount: function() {
    this.setState({
      timer: setInterval(this.next, this.props.interval)
    });
  },
  componentWillUnmount: function() {
    if(this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({
        timer: null
      });
    }
  },

  render: function() {
    var boxes = new Array(this.props.boxCount).fill('').map((item, idx) => {
      return this.state.count === idx ? <span key={idx} className='box active' />
                                      : <span key={idx} className='box' />
    });

    return (
      <div className='fetching-widget'>
        <span className='lbl'>{this.props.label}</span><span className='boxes'>{boxes}</span>
      </div>
    );
  },

  next: function() {
    var count = this.state.count + 1;
    if( count === this.props.boxCount) count = 0;
    this.setState({
      count: count
    });
  },

});
