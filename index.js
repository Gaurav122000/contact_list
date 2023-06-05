const exp = require('constants');
const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/Contact');
const app = express();

app.set('view engine', 'ejs');//use ejs
app.set('views', path.join(__dirname, 'views'));//path to ejs
app.use(express.urlencoded({extended : true}));//parser it's a middleware
app.use(express.static('assets'));//static assets middleware

var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});

app.get('/', function(req,res){
    Contact.find().then((contacts)=>{
        return res.render('home',{
        title: "Contact List",
        contact_list: contacts
       })
    })
    .catch((err)=>{console.log("Error in fetching contacts from db :",err)}); 
});

/* app.get('/', function(req, res){
    return res.render('home',{
        title: "Contact List",
        contact_list: contactList
    });
}) */


/*  create contact */
app.post('/create-contact', function(req, res){
    /* contactList.push({
        name : req.body.name,
        phone : req.body.phone
    }); */

    Contact.create({//create quarry
        name: req.body.name,
        phone: req.body.phone
    }/* ,function(err, newContact){
        if(newContact){
            console.log('Error in creating a contact!')
            return;}
            
    } */).then((newContact)=>{
        console.log('******', newContact);
        return res.redirect('back');
    })
    .catch((err)=>{console.log('Error in creating a contact!')});
  

    return res.redirect('/');
});

app.get('/delete-contact/', function(req,res){
    /* console.log(req.query); */
    /* let phone = req.query.phone; */
    let id = req.query.id;
    console.log("Deleted contact : ",req.query.id);
    /* let contactIndex = contactList.findIndex(contact => contact.phone == phone);//it return -1 if doesn't match or return the index number of the matched item

    if (contactIndex != -1){
        contactList.splice(contactIndex,1);
    }

    return res.redirect('back'); */
    Contact.findByIdAndDelete(id).then(()=>{return res.redirect('back')})
                                 .catch((err)=>{console.log('Error in deleting from database : ',err)});
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})