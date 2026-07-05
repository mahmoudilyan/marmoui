const { docs } = require('./.source/index.ts');
console.log('Docs keys:', Object.keys(docs));
console.log('Docs prototype:', Object.getPrototypeOf(docs));
