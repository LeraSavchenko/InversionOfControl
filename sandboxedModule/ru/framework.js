// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');

//Creating new sandbox with a global
//context for the application.
function newSandbox() {
    var context = { module: {},
                    console: console,
                    setInterval: setInterval,
                    setTimeout: setTimeout,
                    clearInterval: clearInterval,
                    util: util
                    };
    context.global = context;
    return vm.createContext(context);
}

function runApp(appName) {
    var fileName = appName;
  }

fs.readFile(fileName, function (err, src) {
  // Тут нужно обработать ошибки
 if (err) {
    console.error(`Something is wrong with the "${appName}" app.`);
    return;
 }
  //Новый сендбокс для приложения 
  var sandbox = newSandbox();
    
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  
  // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  // сохранить в кеш, вывести на экран исходный код приложения и т.д.
});
}

var appName = process.argv[2] || 'application';
runApp(appName);