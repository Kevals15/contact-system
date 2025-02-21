const asyncHandler = require('express-async-handler');
const Contact = require('../model/contactModel');
// @desc getall contacts
// @route GET /api/contacts
// @access private

const getcontacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ id: req.user.id });
    res.status(200).json(contacts);
})

// @desc create contacts
// @route post /api/contacts
// @access private

const createcontacts = asyncHandler(async (req, res) => {
    console.log("the body is", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        id: req.user.id
    })
    res.status(201).json(contact);
})

// @desc GET contact
// @route GET /api/contacts/:id
// @access private

const getcontact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
})

// @desc put contact
// @route put /api/contacts/:id
// @access private

const updatecontact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        req.status(404);
        throw new Error("contact not found");
    }

    if (contact.id.toString() !== req.user.id.toString()) {
        res.status(401);
        throw new Error("no permission to update");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
})
// @desc delete contact
// @route delete /api/contacts/:id
// @access private

const deletecontact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        req.status(404);
        throw new Error("contact not found");
    }

    if (contact.id.toString() !== req.user.id.toString()) {
        res.status(401);
        throw new Error("no permission to delete");
    }

    const deletedcontact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedcontact);
})

module.exports =
{
    getcontacts, createcontacts, getcontact, updatecontact, deletecontact
};