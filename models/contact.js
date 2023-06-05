const mongoose = require('mongoose');// if we require mongoose multiple time in our program they all use the same instance that where created by first require mongoose

const contactSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;