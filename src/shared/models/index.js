const sampleModels = require('./sample.models');
const customerModels = require('./customer.models');


const sharedModels = {
    sample: sampleModels,
    customer: customerModels,
}

module.exports = sharedModels;