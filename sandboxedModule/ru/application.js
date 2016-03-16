// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
console.log('From application global context');

var interval = setInterval(function () {
    console.log('Hello from timer!');
}, 1000);

setTimeout(function () {
    clearInterval(interval);
    console.log('Timeout!!!');
}, 5000);

util.log('Date and time info.');
console.log('Is 1 a symbol? - ' + util.isSymbol(1));
console.log('Is symbol LOL a symbol(obviously)? - '
             + util.isSymbol(Symbol('LOL')));

module.exports = function () {
  // Вывод из контекста экспортируемой функции
    console.log('From application exported function');
};
