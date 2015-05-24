var http = require('http'),
    fs = require('fs'),
    csv = require('csv');

/*
http.get('http://xn--80apfumee9a0bg.xn--80asehdb/index.php', function(res) {
    console.log(res);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
})
*/

if (process.argv[2]) {
    fs.readFile(process.argv[2], { encoding: 'utf8' }, function(err, data) {
        var regexp = new RegExp('(?:' + process.argv[3] + '[^руб]*)(\\d{4,}) руб');


        console.log(data.match(regexp)[1]);

    });
} else {
    console.log('no target');
}

fs.readFile('Product_Casio1.csv', { encoding: 'utf8' }, function(err, data) {
    csv.parse(data, { delimeter: '^' }, function(err, data) {
        csv.stringify(data, function(err, data) {
            process.stdout.write(data);
        })
    });
});
