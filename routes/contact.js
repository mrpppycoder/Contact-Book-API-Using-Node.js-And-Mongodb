const express = require('express')
const router = express.Router()
const Conatc = require('../modules/contacts')

router.get('/', async (req, res) => {
    try {
        const contact = await Conatc.find()
        res.json(contact)
    } catch (err) {
        res.send('Error', err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const contacts = await Conatc.findById(req.params.id)
        res.json(contacts)
    } catch (err) {
        res.send('Error', err)
    }
})
router.post('/', async (req, res) => {
    const contact = new Conatc({
        fullName: req.body.fullName,
        phones: req.body.phones,
        city: req.body.city
    })
    try {
        const c1 = await contact.save()
        res.json(c1)
    } catch (err) {
        console.log(err)
        res.send('Error')

    }
})

router.post('/api/addPhone', async (req, res) => {
    try {
        var contactId = req.body.contactId;
        var phone = req.body.phone;
        console.log(contactId)
        const insertdata = await Conatc.updateOne({ _id: contactId }, { "$push": { phones: phone } });
        res.status(200).send(insertdata);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }


})
router.put("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateData1 = await Conatc.findOneAndUpdate(_id, req.body);
        res.status(201).send(updateData1);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
})
router.patch("/api/")
//update data
router.patch("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateData = await Conatc.findByIdAndUpdate(_id, req.body);
        res.status(201).send(updateData);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
})
//edit phone by type
router.patch("/api/updatePhone/:id",async(req, res)=>{
    try{
        const UpdatePhone= await Conatc.findOneAndUpdate({"_id": req.params.id,"phones.type": req.body.type},
        { $set: {"phones.$.phone": req.body.phone}},
            { new: true })
            console.log(UpdatePhone)
        res.send(UpdatePhone);
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
});

router.delete("/api/removePhone/:id", async (req, res) => {
    try {
            const removeRecord = await Conatc.findOneAndUpdate({ "_id": req.params.id }, {
            $pull: { phones: { phone: req.body.phone } }
        },
            { new:false });
        res.send(removeRecord);
       
    } catch (err){
        res.status(500).send(err);
        console.log(err)
    }
});
//delete data
router.delete("/:id", async (req, res) => {
    try {

        const deleteData = await Conatc.findByIdAndDelete(req.params.id);
        res.status(201).send(deleteData);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
})
module.exports = router