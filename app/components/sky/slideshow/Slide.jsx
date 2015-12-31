import React from 'react';

import {ImageLoader} from '../../sky';

export default React.createClass({
  render: function() {
    let cssNames = this.props.active ? 'active' : 'off';
    return (
      <div className={'slide ' + cssNames}>
        <ImageLoader src={'/content/images/slideshow/' + this.props.src} />
      </div>
    );
  }
})
