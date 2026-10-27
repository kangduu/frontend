var Book = (function () {
    //静态私有,不论对类如何实例化，只创建一次。
    var num = 0;
    function checkBook() {}

    //创建类
    function _book(newId, newName, newPrice) {
        //对象安全模式
        if (!(this instanceof _book)) return new _book(newId, newName, newPrice);

        //特权
        this.setName = function (newName) {
            name = newName
        };
        this.setPrice = function (newPrice) {
            price = newPrice
        };
        this.getName = function () {
            return name
        };
        this.getPrice = function () {
            return price
        };

        //公有
        this.id = newId;
        this.copy = function () {};

        num++;
        if (num > 100) {
            throw new Error('超过最大限制')
        }

        //构造器
        this.setName(newName);
        this.setPrice(newPrice);
    }

    //构造原型
    _book.prototype = {
        isBook: true,
        display: function () {
            console.log(this.id);
            console.log(this.getName());
            console.log(this.getPrice());
        }
    };

    return _book;
})();


var book = Book(1, 'java', 20);
console.log(book.display());