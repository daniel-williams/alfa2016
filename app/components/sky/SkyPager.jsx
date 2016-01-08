import React, {PropTypes} from 'react';


export default React.createClass({
  propTypes: {
    items: PropTypes.arrayOf(PropTypes.any),
    size: PropTypes.number,
    page: PropTypes.number,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onPage: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      items: [],
      size: 10,
      page: 0,
      onNext: function() {},
      onPrev: function() {},
      onPage: function() {},
    };
  },
  componentWillMount: function() {

  },
  componentWillReceiveProps: function(nextProps) {

  },
  render: function() {
    return (
      <div className='sky-pager'>

      </div>
    );
  },

});


// <nav>
//   <ul class="pager">
//     <li class="previous disabled"><a href="#"><span aria-hidden="true">&larr;</span> Older</a></li>
//     <li class="next"><a href="#">Newer <span aria-hidden="true">&rarr;</span></a></li>
//   </ul>
// </nav>
