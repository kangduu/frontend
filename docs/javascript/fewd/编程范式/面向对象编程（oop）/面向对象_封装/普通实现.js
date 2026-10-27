var Book = function (id, bookname, price) {
    //静态私有变量
    var num = 0;
    //静态私有方法
    function checkID() { }

    //对象共有属性
    this.id = id;
    this.bookname = bookname;
    this.price = price;
    //对象共有方法(特权方法)
    this.checkName = function () { };

    //构造方法
    this.sayName = function () { return this.bookname };

    //构造器
    this.sayName();
};

//静态类公有属性，只被类所拥有。
Book.count = 65;
//静态类公有方法
Book.resetT = function () { console.log('new Time') };

//共有属性
Book.prototype.date = '2019-08-01';
//共有方法
Book.prototype.getBookN = function () { return this.bookname };
//或者
// Book.prototype = {
//     getID: function(){},
//     getName: function(){},
//     getPrice: function(){}
// }
var book = new Book(1, 'JavaScript', 99);
// console.log(book.date);
// console.log(book.getBookN());
console.log(book.count);
