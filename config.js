require("dotenv").config();

module.exports = {
  creator: "zy3x.",
  token: process.env.TOKEN || 'MTIxNTY5MzUwODc0MDkxMTIwNg.Gh2CQq.v3n_v0Mpl-TLFltRkjjqf_fYgjwlylre8KSjU8',
  prefix: process.env.PREFIX || '!', 
  ownerID: process.env.OWNERID?.split(',') || ['1175829774086717444'], 
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
