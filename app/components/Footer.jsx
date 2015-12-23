import React from 'react'

require('./Footer.less');

export default React.createClass({
  render: function() {
    return (
      <div id='footer' style={{margin:'40px 0 10px',border:'1px solid red'}}>I'm a footer</div>
    )
  }
})
