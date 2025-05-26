const fs = require('fs');

exports.log = (req,res,next) => {
    let logArray = [];
    logArray.push((new Date()).toLocaleString());
    logArray.push(req.url);
    logArray.push(req.method);
    logArray.push(req.ip);
    if(req.params && Object.keys(req.params).length > 0){
        logArray.push(JSON.stringify(req.params));
    }
    if(req.body && Object.keys(req.body).length > 0){
        let body = {...req.body};
        if(body.password){
            body.password = '********';
        }
        logArray.push(JSON.stringify(body));
    }
    if(req.headers['content-type']){
        logArray.push(JSON.stringify(req.headers['content-type']));
    }
    fs.appendFileSync('./log/req.log.txt',logArray.join(' ') + "\n",{flag: 'a+'});
}