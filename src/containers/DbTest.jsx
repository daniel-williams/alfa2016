import React from 'react';
import db from '../services/db';

const gList = db.gallery.find({}).toArray();

export const DbTest = React.createClass({

    render: function() {
        var galleries = gList.map(item => <div>{item.name}</div>);
        return (
            <div>
                <h1>Database Connection Test</h1>
                {galleries}
            </div>
        );
    },
});
