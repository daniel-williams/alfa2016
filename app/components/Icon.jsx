import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixin: [PureRenderMixin],

  propTypes: {
    name: PropTypes.string,
  },

  render: function() {
    return (
      <i className={'icon-alfa-' + this.props.name} {...this.props} />
    );
  }
})
