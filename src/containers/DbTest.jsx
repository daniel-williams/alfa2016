import React from 'react';
// import db from '../services/db';

// const gList = db.gallery.find({}).toArray();

var Rebase = require('re-base');
var base = Rebase.createClass('https://blistering-torch-4532.firebaseio.com');



const DbTest = React.createClass({
    getInitialState: function() {
        console.log('getInitialState');
        return {
            galleries: []
        };
    },
    componentWillMount: function() {
        console.log('componentWillMount');
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
        console.log('render');
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
