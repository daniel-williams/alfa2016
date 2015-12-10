import fs from 'fs';
import mongodb, {MongoClient} from 'mongodb';

var DATA_ROOT = './';
// temp user only enabled for import
var MONGO_DB_URL = "mongodb://temp:vn7pwgj9Yh5MBDv@ds056688.mongolab.com:56688/art";


var artRaw = fs.readFileSync(DATA_ROOT + 'alfa-art.json', 'utf8');
var artJson = JSON.parse(artRaw);

var galleriesRaw = fs.readFileSync(DATA_ROOT + 'alfa-galleries.json', 'utf8');
var galleriesJson = JSON.parse(galleriesRaw);

MongoClient.connect(MONGO_DB_URL, function(err, db) {
    var galleryCollection = db.collection('gallery');
    var galleryRemoveResult = galleryCollection.remove({});
    galleryCollection.insertMany(galleriesJson, function(err, result) {
        if(err) { console.log('Galleries Insert Error:', err); }
        console.log('Galleries Insert Result', result.result);
        galleryCollection.update({}, {$unset: {id:1}}, {multi: true})
            .then(result => console.log('remove id:', result.result))
            .catch(err => console.log('error:', err));
    });


    var artCollection = db.collection('art');
    var artRemoveResult = artCollection.remove({});
    artCollection.insertMany(artJson, function(err, result) {
        if(err) { console.log('Art Insert Error:', err); }
        console.log('Art Insert Result:', result.result);
        artCollection.update({}, {$unset: {id:1}}, {multi: true})
            .then(result => console.log('remove id:', result.result))
            .catch(err => console.log('error:', err));
    });
});
