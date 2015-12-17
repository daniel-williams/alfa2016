import React from 'react';
import Rebase from 're-base';

var base = Rebase.createClass('https://blistering-torch-4532.firebaseio.com');


const DbTest = React.createClass({
    getInitialState: function() {
        return {
            galleries: []
        };
    },
    componentWillMount: function() {
        base.fetch('gallery', {
            context: this,
            asArray: true,
            then(data) {
                this.setState({
                    galleries: data
                });
            }
        });
    },
    render: function() {
        var gList = this.state.galleries.map(item => <div>{item.name}</div>);
        return (
            <div>
                <h1>Database Connection Test</h1>
                {gList}
            </div>
        );
    },
});

export default DbTest;
