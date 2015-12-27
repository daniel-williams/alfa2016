import fs from 'fs';
import art from './alfa-art.json';

const sourceRoot = '../../art/';
const targetRoot = '../../art-processed/';
let issueCount = 0;
let goodToGoCount = 0;

art.forEach(function(item) {
  let hasIssue = false;
  if(!fs.existsSync(sourceRoot + 'Sm_' + item.filename)) {
    hasIssue = true;
    console.log('-sm ' + item.filename);
  }
  if(!fs.existsSync(sourceRoot + 'Md_' + item.filename)) {
    hasIssue = true;
    console.log('-md ' + item.filename);
  }
  if(!fs.existsSync(sourceRoot + 'Lg_' + item.filename)) {
    hasIssue = true;
    console.log('-lg ' + item.filename);
  }

  if(hasIssue) {
    issueCount++;
  } else {
    goodToGoCount++;
  }
});

console.log('Issues: ', issueCount);
console.log('Good to go:', goodToGoCount);

if(issueCount === 0) {
  art.forEach(function(item) {
      copyFile(sourceRoot + 'Sm_' + item.filename, targetRoot + item.slug + '-sm.jpg');
      copyFile(sourceRoot + 'Md_' + item.filename, targetRoot + item.slug + '-md.jpg');
      copyFile(sourceRoot + 'Lg_' + item.filename, targetRoot + item.slug + '-lg.jpg');
  });
}


function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on('error', function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on('error', function(err) {
    done(err);
  });
  wr.on('close', function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (err) {
      console.log(`Error (${source}): ${err}`);
    } else {
      console.log(`Success (${source})`);
    }
  }
}
