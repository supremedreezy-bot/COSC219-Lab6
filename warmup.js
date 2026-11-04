const original = { name: 'Knox', km: 2.8 };
const alias = original;
const copy = { ...original };
// Prediction: original.km becomes 99 because alias refers to the same object.
alias.km = 99;
console.log('original.km after alias change:', original.km); // 99
// Prediction: original.km stays 99 because copy is a different object.
copy.km = 1;
console.log('original.km after copy change:', original.km); // 99
console.log(original === alias); // true
console.log(original === copy); // false

const outer = { name: 'X', meta: { tags: ['steep'] } };
const shallow = { ...outer };
// Prediction: outer.name stays X, but the nested tags array is shared.
shallow.name = 'changed';
shallow.meta.tags.push('rocky');
console.log(outer.name); // X
console.log(outer.meta.tags); // ['steep', 'rocky']
console.log(outer.meta === shallow.meta); // true
console.log(({ x: 1 } === { x: 1 })); // false

