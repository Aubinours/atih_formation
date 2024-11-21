var yargs = require('yargs');
var argv = yargs.argv;
var config = require('./config');

const path = require('path');
const fs = require('fs');
var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else {
            /* Is a file */
            var finalfilepath = file.replace('kit/','').replace('ods-portal/', '');
            results.push(finalfilepath);
        }
    });
    return results;
}


let express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.set('views', './');

config.PAGES.forEach(function (page) {
    let re = new RegExp('/pages/' + page + '$');
    app.get(re, (req, res) => {
        res.render('kit/views/index-pages', {
            'slug': page,
            'apikeys': config.API_KEYS,
            'defaultdomain': config.DEFAULT_DOMAIN_URL,
            'jsscripts': walk('kit/scripts').concat(walk('ods-portal/ods-core-widgets'))
        });
    });
});

app.get(['/'], (req, res) => {
    res.render('kit/views/index', {
        'pages': config.PAGES,
        'apikeys': undefined,
        'defaultdomain': undefined,
        'jsscripts': undefined
    });
});

app.get('/explore/*', (req, res) => {
    console.log(req._parsedUrl.search);
    res.redirect(config.DEFAULT_DOMAIN_URL + '/explore/' + req.params[0] + req._parsedUrl.search);
});

app.use(express.static('kit'));
app.use(express.static('ods-portal'));
app.use(express.static('output'));

app.listen(argv.port, () => console.log('ExpressJS App listening on :' + argv.port + ' !'));
