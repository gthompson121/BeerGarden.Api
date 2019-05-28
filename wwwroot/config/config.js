// module variables
const config = require('./config.json');
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = environmentConfig;

// as a best practice
// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = finalConfig;

// log global.gConfig
console.log(`global.gConfig: ${JSON.stringify(global.gConfig)}`);