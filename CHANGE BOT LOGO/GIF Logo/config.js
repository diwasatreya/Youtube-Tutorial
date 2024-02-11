require("dotenv").config();

module.exports = {
  creator: "diwasatreya",
  token: process.env.TOKEN || '',
  prefix: process.env.PREFIX || '!', 
  ownerID: process.env.OWNERID?.split(',') || ['519666024220721152'], 
  embedColor: process.env.COlOR || '#2b2d31',
};
 

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
