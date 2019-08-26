const cons = (a, b) => pick => pick === 1 ? a : b;

const car = cons => cons(1);

const cdr  = cons => cons(2);

const c1 = cons(1,2);
const c2 = cons(2, 3);
const c3 = cons(c1, c2);

console.log(car(c1), cdr(c1));
console.log(car(c2), cdr(c2));
console.log(car(car(c3)), cdr(cdr(c3)));