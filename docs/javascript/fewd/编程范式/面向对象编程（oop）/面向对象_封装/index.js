class Car {
    constructor(name, price) {
        //实例属性
        this.name = name;
        this.price = price;
    }
    //静态方法，只能通过类调用，子类只能通过super调用
    static check() {
        return 'yes'
    }
    //实例方法
    run() {
        return 'running'
    }
    // 取值函数
    get prop() {
        return 'getter'
    }
    // 存值函数
    set prop(value) {
        return 'setter:' + value
    }
}
// 静态属性
Car.tool = 'plant';

let car = new Car('audi', '100w');
console.log(car.run());
console.log(car.check);
