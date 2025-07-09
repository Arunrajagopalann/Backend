const customerMode = require("../models/masters/theme/customer.model");

const customer = [
    {
        customerName: "customer-1",
        status: 'ACTIVE'
    },
    {
        customerName: "customer-2",
        status: 'ACTIVE'
    },
    {
        customerName: "customer-3",
        status: 'ACTIVE'
    },
    {
        customerName: "customer-4",
        status: 'ACTIVE'
    },
    {
        customerName: "customer-5",
        status: 'ACTIVE'
    },
    {
        customerName: "customer-6",
        status: 'ACTIVE'
    }
];

const seedCustomer = async ()=>{
    try{
        await customerMode.deleteMany({});
        await customerMode.insertMany(customer);
    }
    catch(err){
        console.log(err);
    }
}
module.exports = seedCustomer;