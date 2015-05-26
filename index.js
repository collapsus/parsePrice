!process.argv[2] && console.log('no source site address');
!process.argv[3] && console.log('no target file name');

var http = require('http'),
    csv = require('csv'),
    fs = require('fs'),
    rstream = fs.createReadStream(process.argv[3]),
    wstream = fs.createWriteStream('result.csv');

http.get(process.argv[2], function(res) {
    var body = '';

    res.setEncoding('utf8');
    
    res
        .on( 'data', function(chunk) {
            body += chunk;
        })
        .on('end', function() {
            rstream
                .pipe(csv.parse({ delimiter: '^', columns: true }))
                .pipe(csv.transform(function(record){
                    var regexp = new RegExp('(?:' + record.product_sku + '[^руб]*>)(\\d+) руб'),
                        match = body.match(regexp);

                    console.log(record.product_sku, match ? match[1] : 'nothing matched');

                    record.source_product_price = match ? match[1] : 0;
                    record.source_product_in_stock = +!!match;

                    return record;
                }))

               .pipe(csv.stringify({ delimiter: '^', header: true }))
               .pipe(wstream);
        });
    
}).on('error', function(e) {
    console.log('Got error: ' + e.message);
});
