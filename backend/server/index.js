const chalk = require('chalk'); 
const signale = require('signale');
const express = require('express');
const http = require('http');
const io = require('./io-setup.js');

const scriptRouter = routeRequire('../route/script')(express);

const env = process.env;
const port = env.PORT || 3000;
const app = express();
const server = http.createServer(app);
io.setup(server);



app.use('/script', scriptRouter);

setImmediate(() => {
    
    server.listen(port, function(err){
        if(err) throw err;
        signale.success(chalk.green(`Listening on port ${port}`));
    });

});

function routeRequire(service, route){
    if(route === undefined)
        return require(`../route/${service}`);
    else
        return require(`../route/${service}/${route}`);
}
