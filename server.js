//  OpenShift sample Node application
var app = require('./app');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

var morgan = require('morgan');
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


app.get('/', function (req, res) {
  res.render('index.html');
});
// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

server.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
