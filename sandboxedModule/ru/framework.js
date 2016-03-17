var fs = require('fs'),
    vm = require('vm'),
    util = require('util');

var context = createContext();

var sandbox = vm.createContext(context);

var fileName = './application.js';
fs.readFile(fileName, function (err, src) {
  // Тут нужно обработать ошибки
    if (err) {
        console.error(`Something is wrong with the "${appName}" app.`);
    return;
    }
  // Запускаем код приложения в песочнице
    var script = vm.createScript(src, fileName);
    script.runInNewContext(sandbox);

});


function log(appName, message) {
    fs.writeFile(".log", [appName, new Date(), message].join(" : "), function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function createContext(appName) {
    var context = {
        module: {},
        console: {},
        clearInterval: clearInterval,
        setInterval: setInterval,
        setTimeout: setTimeout,
        util: util,
        require: function (mod) {
            log(appName, mod);
            return require(mod);
        }
    };
  
    context.module.exports = {};

    context.global = context;
    context.console.log = function (message) {
        log(appName, message);
        console.log([appName, new Date(), message].join(" | "));
    };
  
    return context;
}