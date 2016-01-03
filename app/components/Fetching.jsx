import React, {PropTypes} from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';

require('./Fetching.less');


export default React.createClass({
  // mixins: [PureRenderMixin],

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
      let active = this.state.count >= idx ? ' active' : '';
      return <span key={idx} className={'box' + active} />
    });

    return (
      <div className='fetching-widget'>
        <span className='lbl'>{this.props.label}</span><span className='boxes'>{boxes}</span>
      </div>
    );
  },

  next: function() {
    var count = this.state.count + 1;
    if( count === this.props.boxCount) count = -1;
    this.setState({
      count: count
    });
  },

});
