import Contact from "../models/Contact.js";

export const getContact = async (req, res) => {
  try {
    let contact = await Contact.findOne();

    if (!contact) {
      contact = await Contact.create({});
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    let contact = await Contact.findOne();

    if (!contact) {
      contact = await Contact.create({});
    }

    const { phone, email, address, whatsapp, mapLink } = req.body;

    contact.phone = phone;
    contact.email = email;
    contact.address = address;
    contact.whatsapp = whatsapp;
    contact.mapLink = mapLink;

    await contact.save();

    res.json({ message: "Contact updated", data: contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};