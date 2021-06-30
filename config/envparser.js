const path = require('path')
const DotEnv = require('dotenv')
const env = process.env.NODE_ENV
var env_path = env!='development' ? `./${env}.env` : '.env';
var parsedEnv = DotEnv.config({path : env_path}).parsed
console.log("parsedEnv-- ",parsedEnv);
module.exports = function () {
  
  return parsedEnv

  
}