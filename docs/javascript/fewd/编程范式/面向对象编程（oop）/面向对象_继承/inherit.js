/*1.原型链（prototype模式）继承*/
function Human() {
    this.age = 0;
    this.weight = 8;
}
Human.prototype.getAge = function () {
    return this.age;
};
Human.prototype.getWeight = function () {
    return this.weight;
};
function Person() { }
//Person 继承了 Human 
Person.prototype = new Human(); // 【1】
Person.prototype.constructor = Person;// 【2】
//任何一个prototype对象都有一个constructor属性。而每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。当【1】执行后，constructor属性被更改，需执行【2】手动更改回来。记住，如果替换了prototype对象，下一步必须为新的prototype对象加上constructor属性，并将这个属性指回原来的构造函数。

var Tom = new Person();
console.log(Tom.getAge())

var Jack = new Person();
console.log(Jack.getAge())
console.log(Jack.getWeight())



/*2.借用构造函数绑定继承（伪类继承或经典继承）*/
function Super(name) {
    this.color = ['yellow', 'red', 'blue'];
    this.name = name;
}
function Sub() {
    //继承了Super，同时还传递了参数
    Super.call(this, 'Tom');
    //实例属性
    this.age = 10;
}

var instance = new Sub();
console.log(instance.age, instance.name);

var instance1 = new Sub();
instance1.color.push('green');
console.log(instance1.color);

var instance2 = new Sub();
console.log(instance2.color);



/*3.组合继承（伪经典继承）*/
function SuperGro(name, weight) {
    this.name = name;
    this.weight = weight;
    this.color = ['pink', 'green', 'white']
}
SuperGro.prototype.showName = function () {
    console.log(this.name)
};
SuperGro.prototype.showWeight = function () {
    console.log(this.weight)
};
function SubGro(name, weight, age) {
    //继承属性
    //第二次调用SuperGro()，SubGro.prototype 又得到了name、weight、color三个属性，并对上次得到的值进行了覆盖。
    SuperGro.call(this, name, weight);
    this.age = age
}
//继承方法
//第一次调用SuperGro()，SubGro.prototype 得到了name、weight、color三个属性
SubGro.prototype = new SuperGro();
SubGro.prototype.constructor = SubGro;
SubGro.prototype.showAge = function () {
    console.log(this.age)
};
var _instance1 = new SubGro('Ma', 60, 18);
_instance1.color.push('black');
console.log(_instance1.color);
_instance1.showAge();
_instance1.showName();
_instance1.showWeight();

var _instance2 = new SubGro('Jimi', 80, 20);
console.log(_instance2.color);
_instance2.showAge();
_instance2.showName();
_instance2.showWeight();

/*4.寄生组合继承*/
function SuperParG(name) {
    this.name = name;
    this.color = ['pink', 'green', 'white']
}
SuperParG.prototype.sayName = function () {
    console.log('naem is ' + this.name)
};

function SubPG(name, age) {
    SuperParG.call(this, name);
    this.age = age
}
if (!Object.create) {//如果Object.create()方法不存在，重写此方法
    Object.create = function (proto) {
        if (proto == null) throw TypeError();
        var temp = typeof proto;
        if (temp !== 'object' && temp !== 'function') throw TypeError();
        //空对象作为中介，几乎不占内存。
        function Foo() { }
        Foo.prototype = proto;
        return new Foo;
    }
}
SubPG.prototype = Object.create(SuperParG.prototype);
SubPG.prototype.constructor = SubPG;
SubPG.prototype.sayAge = function () {
    console.log('age is ' + this.age)
}
var _inst = new SubPG('King', 12);
_inst.color.pop();
console.log(_inst.color);
_inst.age = 14;
_inst.sayAge();
var test = new SubPG("jj",11);
console.log(test.color);
test.sayAge();

/*5.ES6中的class*/
class Parent {
    constructor(name) {
        this.name = name;
        this.color = ['red'];
    }
    sayName() {
        return this.name
    }
}
class Son extends Parent {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}
var Timi = new Son('Timi', 16);
Timi.color.push('yellow');
console.log(Timi.color);
console.log(Timi.sayName());


/* 6.拷贝继承 */
function Animal(){}
Animal.prototype.species = "动物";

function extend1(child,parent)  {//深拷贝
    var p = parent.prototype;
    var c = child.prototype;
    for (var i in p){
        c[i] = p[i];
    }
    // c = JSON.parse(JSON.stringify(p))
    c.upper = p;
}

function Cat(name,color){
    this.name = name;
    this.color = color
}
extend1(Cat,Animal);
var cat1 = new Cat('tony','red')
console.log(cat1.name)
cat1.species = '人';
console.log(cat1.species)
console.log(Animal.prototype.species)

/* 7.非构造函数继承 */
//定义以下两个对象，如何让他们关联起来。
// var Chinese = {
//     nation: '中国'
// }
// var Teacher = {
//     career: '教师'
// }

var Chinese = {
    nation: '中国'
}
function object(obj){
    function Foo(){}
    Foo.prototype = obj;
    return new Foo()
}
var Teacher = object(Chinese);
Teacher.career = '教师';
console.log(Teacher['nation'])