import fs from 'fs';
import {toSlug} from './slug-utils';


var DATA_ROOT = './';

var galleries = getGalleries();
var orientations = getOrientations();
var keywords = getKeywords();
var categories = getLookupTable();
var art = getArt();

galleries = removeGuid(galleries);
art = removeGuid(art);

fs.writeFile(DATA_ROOT + 'alfa-galleries.json', JSON.stringify(galleries));
fs.writeFile(DATA_ROOT + 'alfa-art.json', JSON.stringify(art));
fs.writeFile(DATA_ROOT + 'firebase.json', JSON.stringify({galleries: galleries, art: art}));

console.log('total galleries:', galleries.length);
console.log('total orientations:', orientations.length);
console.log('total keywords:', keywords.length);
console.log('total categories:', categories.length)
console.log('total art:', art.length);


function removeGuid(arr) {
    return arr.map(function(item) {
        delete item['guid'];
        return item;
    });
}


function getGalleries() {
    var galleries = [];
    var data = fs.readFileSync(DATA_ROOT + 'alfa-galleries.txt', 'utf8');

    var lines = data.split('\r\n').slice(1);
    galleries = lines.reduce(function(accum, line, i) {
        var fields = line.split('\t');
        if(fields.length !== 4) return accum;

        accum.push({
            id: null, // creating here to force first prop
            guid: fields[0],
            name: fields[1],
            slug: toSlug(fields[1]),
            thumb: fields[2],
            order: fields[3],
        });
        return accum;
    }, []);
    galleries.sort(function(a, b) {
        return a.order === b.order ? 0
                                   : a.order < b.order ? -1 : 1;
    });

    // reindex
    return galleries.map(function(item, i) {
        item['id'] = i + 1;
        return item;
    });
}

function getOrientations() {
    var orientation = [];
    var data = fs.readFileSync(DATA_ROOT + 'alfa-orientation.txt', 'utf8');

    var lines = data.split('\r\n').slice(1);
    var idx = 0;
    orientation = lines.reduce(function(accum, line, i) {
        var fields = line.split('\t');
        if(fields.length !== 2) return accum;

        accum.push({
            id: ++idx,
            guid: fields[0],
            name: fields[1].toLowerCase(),
        });
        return accum;
    }, []);
    return orientation;
}

function getKeywords() {
    var keywords = [];
    var data = fs.readFileSync(DATA_ROOT + 'alfa-keywords.txt', 'utf8');

    var lines = data.split('\r\n').slice(1);
    var idx = 0;
    keywords = lines.reduce(function(accum, line, i) {
        var fields = line.split('\t');
        if(fields.length !== 2) return accum;

        accum.push({
            id: ++idx,
            guid: fields[0],
            name: fields[1].toLowerCase(),
            slug: toSlug(fields[1]),
        });
        return accum;
    }, []);
    return keywords;
}

function getLookupTable() {
    var lookupTable = [];
    var data = fs.readFileSync(DATA_ROOT + 'alfa-art-cat.txt', 'utf8');

    var lines = data.split('\r\n').slice(1);
    lookupTable = lines.reduce(function(accum, line, i) {
        var fields = line.split('\t');
        if(fields.length !== 2) return accum;

        accum.push({
            artGuid: fields[0],
            catGuid: fields[1],
        });
        return accum;
    }, []);
    return lookupTable;
}



function getArt() {
    var art = [];
    try {
        var data = fs.readFileSync(DATA_ROOT +'alfa_art.txt', 'utf8');
        var lines = data.split('\r\n').slice(1);
        art = lines.reduce(function(accum, line, i) {
            var fields = line.split('\t');
            if(fields.length < 14) return accum;
            fields = fields.map(item => item === 'NULL' ? undefined : item);

            var width = toInt(fields[7]);
            var height = toInt(fields[8]);
            accum.push({
                id: null, // creating here to force first prop
                guid: fields[0],
                title: fields[1],
                slug: toSlug(fields[1]),
                filename: fields[2],
                media: fields[3],
                description: fields[4],
                created: toDate(toInt(fields[6]), toInt(fields[5]) - 1),
                width: width,
                height: height,
                isForSale: toBool(fields[9]),
                price: toFloat(fields[10]),
                isSold: toBool(fields[11]),
                isActive: toBool(fields[12]),
                galleries: buildGalleryList(fields[13]),
                orientation: width > height ? ['horizontal']
                                            : width < height ? ['vertical']
                                                             : ['horizontal', 'vertical'],
                keywords: buildKeywordList(fields[0]),
            });
            return accum;
        }, []);
    } catch(err) { console.log('Error reading art.', err); }

    var orderedArt = art.slice(0);
    orderedArt.sort(function(a, b) {
        var aDate = new Date(a.created).getTime();
        var bDate = new Date(b.created).getTime();
        return aDate === bDate ? a.title === b.title ? 0
                                                     : a.title < b.title ? -1:1
                               : aDate < bDate ? -1:1;
    });

    // reindex
    return orderedArt.map(function(item, i) {
        item['id'] = i + 1;
        return item;
    });
}


function buildGalleryList(guid) {
    var galleryList = [];
    galleries.forEach(function(gallery, i) {
        if(gallery.guid === guid) {
            galleryList.push(toSlug(gallery.name));
        }
    });
    return galleryList;
}

function buildKeywordList(artGuid) {
    var keywordList = [];
    categories.forEach(function(cat) {
        if(cat.artGuid === artGuid) {
            keywords.forEach(function(keyword) {
                if(keyword.guid === cat.catGuid) {
                    keywordList.push(keyword.name);
                }
            });
        }
    });
    return keywordList;
}




function toBool(val) {
    return isNaN(parseInt(val)) ? !!val : !!parseInt(val);
}
function toInt(val) {
    return isNaN(parseInt(val)) ? undefined : parseInt(val);
}
function toFloat(val) {
    return isNaN(parseFloat(val)) ? undefined : parseFloat(val)
}
function toDate(year, month) {
    var created = new Date();
    try {
        created = new Date(year, month);
    } catch(e) {
        console.log('Error parsing date from: ', year, month);
    }
    return created
}
