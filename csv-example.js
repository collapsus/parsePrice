var csv = require('csv');
var fs = require('fs');
var rstream = fs.createReadStream(process.argv[2]);
var wstream = fs.createWriteStream('_' + process.argv[2]);

rstream
    .pipe(csv.parse({ delimiter: '^', columns: true }))
    .pipe(csv.transform(function(record){

        record.bla = '%%';

        var b = Math.random() < 0.5;

        console.log(b);

        record.ha = b ? 'undefined' : '';

        return record;
    }))

   .pipe(csv.stringify({ delimiter: '^', header: true }))
   .pipe(wstream);
