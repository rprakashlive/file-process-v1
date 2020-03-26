var fs = require('fs');
var path = require('path');
var async = require('async');
var mergeDeep = require('deepmerge');
var _ = require('lodash');

  
module.exports.createJson = function(req, res) {
req.setTimeout(10000000000000000000000000);

console.log("init process -- create json");
//console.log("req.body",req.body);

processDir(req.body, function(err, rspData){
    if (err) {
        return res.status(500).send({err : err, message : 'Internal Server Error'})
    }
    if (rspData) {
        return res.status(201).send({data : rspData, message : 'file created successfully'})
    }
});

}

function processDir(bodyData, cb){
    var rspObj = {
        folderStructure : []
    };

    if(bodyData.data.length > 0){
        async.eachSeries(bodyData.data, function(dataObj, dataCB){
           
            console.log("dataObj Index", bodyData.data.indexOf(dataObj) / bodyData.data.length);

            var index = _.find(bodyData.data, function(elemObj){
                return elemObj.filename.toLowerCase() === dataObj.filename.toLowerCase() && elemObj.isThumbFile
            });

            if(index && !dataObj.isThumbFile){ 
                dataObj['thumbPath'] = index['path'];
            }

            var newObj = {
                filename : dataObj.filename,
                caption : dataObj.caption,
                path : dataObj.path,
                thumbPath:  dataObj.thumbPath
            }

            if (dataObj.rootArr) {
                var rootPath = "/" + dataObj.rootArr.join("/");
                var nestedObject = _.reduceRight(dataObj.rootArr, function (arrayObj, arrayValue) {

                    // Construct the object to be returned.
                    var obj = {};
                
                    // Set the new key (arrayValue being the key name) and value (the object so far, arrayObj):
                    obj[arrayValue] = arrayObj;
                
                    // Return the newly-built object.
                    return obj;
                }, {path : rootPath, items : [newObj]});
                rspObj.folderStructure.push(nestedObject);            
                dataCB(null, null);
            }
        }, function(done){ 
            var mergedData = mergeDeep.all(rspObj.folderStructure);
            // var path_dir = path.join(__dirname, '../');
            // fs.writeFileSync(path_dir+'data/'+'data.json', JSON.stringify(mergedData));
            console.log('merged',JSON.stringify(mergedData));
            cb(null, mergedData);
        });
    }
}

