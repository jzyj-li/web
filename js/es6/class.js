/*
*
* class 即构造函数
* */

class Foo {
    constructor () { // new 的时候会调用该方法,可以通过return改变构造函数的返回值
        return Object.create(null)
    }
}
let foo = new Foo()
//console.log(foo instanceof Foo) // false Foo为null

// 类的实例对象
class People {
    constructor () {
        this.sex = 'man';
        this.name = 'liming';
    }
    changeName (value) {
        this.name = value;
    }
}

let person = new People();
console.log(person.hasOwnProperty('name')) // true hasOwnProperty 查看属性是否挂在对象本身
console.log(person.hasOwnProperty('changeName')) // false
console.log(person.__proto__.hasOwnProperty('changeName')) // true _proto_ 访问原型对象

// 不存在变量提升
//new Animal()
//class Animal{} // Animal is not defined

// 私有方法和私有属性
let baz = Symbol('baz')
class Animal {
    changeName (name) {
        changeName.bind(this, name) // 私有 将方法移到外部创建
    }
    _setName () { // 私有 格式区分
    }
    [baz](baz){} // 利用Symbol创建私有方法
}

function changeName(val) {
    return this.name = val;
}

// 私有属性的提案 #
// class Language {
//     #name; // 私有属性
// }

// this的指向
class A {
    constructor(){
        this.x = 1;
        this.y = 2;
        this.aa = this.aa.bind(this); // 这句可解决下面的问题
    }
    aa(){
        return this.x
    }
}

let a = new A();
let {aa} = a;
console.log(aa()) // Cannot read property 'x' of undefined 原因解构赋值值读取对象本身的属性，不读取原型链
// 可以将 aa 函数放到constructor函数中 或者将方法重新绑定到this上
console.log(a) //  { x: 1, y: 2 }

// class 取值函数和class 存值函数
class B {
    get prop () {
        return 'getter'
    }
    set prop (val) {
        console.log('shezhi' + val)
    }
}

var b = new B()
console.log(b.prop)
b.prop = 3;
console.log(b.prop)

// class 的静态方法（不希望实例继承的方法可以被类集成） 直接用类来调用
class C{
    static getname () { // 关键字static
        return this.name; // 此this指向的是类而不是实例
    }
}

console.log(C.getname())

let c = new C()
//c.getname() // c.getname is not a function

class D extends C {

}
console.log(D.getname()) // D

/*
* class 的静态属性和实例属性
* 静态属性指的是挂在类上的属性不是实例上的（this上的）可以直接通过类访问到的
* 实例属性是实例对象上的属性
* */
class E{
    //static num = 3; // 静态属性
    //num = 3; // 实例属性
    constructor () {
        this.a = 4; // 实例属性
    }
}
E.c = 5; // c 静态属性
console.log(new E().a)

// new.target  返回new命令作用于的那个构造函数
class F{
    constructor () {
        console.log(new.target)
    }
}
new F()
