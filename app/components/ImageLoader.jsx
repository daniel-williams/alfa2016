import React, {PropTypes} from 'react';

export default React.createClass({
    displayName: 'ImageLoader',

    propTypes: {
        src: PropTypes.string
    },
    getInitialState: function() {
        return {
            loaded: false,
        };
    },
    componentDidMount: function() {
        var img = new Image();
        img.onload = this.handleLoaded;
        img.src = this.props.src;
    },
    render: function() {
        var cssNames = this.state.loaded ? 'loaded' : 'loading';
        if(this.props.className) cssNames = `${cssNames} ${this.props.className}`;
        return <img {...this.props} className={cssNames} />;
    },


    handleLoaded: function(event) {
        this.setState({
          loaded: true
        });
        if(this.props.onLoad) {
          this.props.onLoad(event);
        }
    },

});
