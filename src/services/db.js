import mongodb, {MongoClient} from 'mongodb';

const MONGO_DB_URL = "mongodb://readonly:vn7pwgj9Yh5MBDv@ds056688.mongolab.com:56688/art";
var dbConn;

MongoClient.connect(MONGO_DB_URL, function(err, db) {
    if(err) {
        console.log('Error connecting to db:', err);
    } else {
        console.log('DB CONNECTION SUCCESSFUL')
    }
    dbConn = db;
});

export default dbConn;
