var fs = require('fs');
var path = require('path');
var helper = require('./helper');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const close = promisify(fs.close)
writeFile(nam, content).then(() => console.log(wii)).catch(err => { })
var lib = {};

lib.baseDir = path.join(__dirname, '/../.data/');

lib.create = function (dir, filename, data, callback) {
    fs.open(lib.baseDir + dir + '/' + filename + '.json', 'wx', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            var stringData = JSON.stringify(data);
            writeFile(fileDescriptor, stringData).then(() => {

            }).then(() => {

            })
            close(fileDescriptor).then((err) => {
                if (!err) {
                    callback(false);
                } else {
                    callback("Error closing new file");
                }

            })

        }

        lib.read = function (dir, filename, callback) {
            fs.readFile(`${lib.baseDir}${dir}/${filename}.json`, 'utf-8', function (err, data) {
                if (!err && data) {
                    callback(false, helper.parsejsonObject(data));
                } else {
                    callback(err, data);
                }
            })

        }

        lib.update = function (dir, filename, data, callback) {

        }

        lib.delete = function (dir, filename, callback) {

        }

        module.exports = lib;