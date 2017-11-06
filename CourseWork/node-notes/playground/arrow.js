


var square = x => x * x;
console.log(square(3));

var user = {
  name:'Kevin',
  sayHi: () => {
    console.log(arguments);
    console.log(`Hi, I'm ${this.name}`);
  },
  sayHiAlt () {
    console.log(arguments);
    console.log(`Hi, I'm ${this.name}`);
  }
};
user.sayHi(1, 2, 3);
