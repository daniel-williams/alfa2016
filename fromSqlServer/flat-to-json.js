import fs from 'fs';

var DATA_ROOT = './';

var galleries = getGalleries();
var orientations = getOrientations();
var keywords = getKeywords();
var categories = getLookupTable();
var art = getArt();

console.log('total galleries:', galleries.length);
console.log('total orientations:', orientations.length);
console.log('total keywords:', keywords.length);
console.log('total categories:', categories.length)
console.log('total art:', art.length);

fs.writeFile(DATA_ROOT + 'alfa-art.json', JSON.stringify(art));
fs.writeFile(DATA_ROOT + 'alfa-galleries.json', JSON.stringify(galleries));



function getGalleries() {
    var galleries = [];
    var data = fs.readFileSync(DATA_ROOT + 'alfa-galleries.txt', 'utf8');

    var lines = data.split('\r\n').slice(1);
    galleries = lines.reduce(function(accum, line, i) {
        var fields = line.split('\t');
        if(fields.length !== 4) return accum;

        accum.push({
            id: fields[0],
            name: fields[1],
            thumb: fields[2],
            order: fields[3],
        });
        return accum;
    }, []);
    return galleries.sort(function(a, b) {
        return a.order === b.order ? 0
                                   : a.order < b.order ? -1 : 1;
    });
}

function getOrientations() {
    var orientation = [];
    var data = fs.readFileSync(DATA_ROOT + 'alfa-orientation.txt', 'utf8');

    var lines = data.split('\r\n').slice(1);
    orientation = lines.reduce(function(accum, line, i) {
        var fields = line.split('\t');
        if(fields.length !== 2) return accum;

        accum.push({
            id: fields[0],
            name: fields[1],
        });
        return accum;
    }, []);
    return orientation;
}

function getKeywords() {
    var keywords = [];
    var data = fs.readFileSync(DATA_ROOT + 'alfa-keywords.txt', 'utf8');

    var lines = data.split('\r\n').slice(1);
    keywords = lines.reduce(function(accum, line, i) {
        var fields = line.split('\t');
        if(fields.length !== 2) return accum;

        accum.push({
            id: fields[0],
            name: fields[1],
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
            artId: fields[0],
            catId: fields[1],
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
                id: fields[0],
                title: fields[1],
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
    return orderedArt;
}


function buildGalleryList(id) {
    var galleryList = [];
    galleries.forEach(function(gallery, i) {
        if(gallery.id === id) {
            galleryList.push(gallery.name);
        }
    });
    return galleryList;
}

function buildKeywordList(artId) {
    var keywordList = [];
    categories.forEach(function(cat) {
        if(cat.artId === artId) {
            keywords.forEach(function(keyword) {
                if(keyword.id === cat.catId) {
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
