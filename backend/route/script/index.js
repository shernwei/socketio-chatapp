// const router = require('express') singleton

const path = require('path');

function routing(express){
    if(typeof express !== 'undefined'){

        router = express.Router();
        route(router);

    }else{
        throw new Error('Express pass to script router is undefined');
    }

    return router;
}

function route(router){

    router.use((req,res,next) => {
        res.set('Content-Type', 'text/javascript');
        next();
    });

    router.get('/browser',(req,res) => {
        res.download(...serviceScript('browser-script'));

    });

    router.get('/react',(req,res) => {
        return res.download(...serviceScript('react-script'));
    })
}


function serviceScript(script){
    return [path.resolve(__dirname,`../../scripts/${script}.js`),'service.js'];
}


module.exports = routing;