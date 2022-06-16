const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../db/contacts");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong, Not found" });
  }
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ message: `Contact with id ${contactId} not found` });
    }
    res.json(contact);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong, Not found" });
  }
};

const createContact = async (req, res) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong, Not found" });
  }
};

const changeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res
      .status(404)
      .json({ message: `Contact with id ${contactId} not found` });
  }
  if (!req.body) {
    return res.status(400).json({ message: "missing required name field" });
  }
  try {
    const updatedContact = await updateContact(contactId, req.body);
    res.json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong, Not found" });
  }
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res
      .status(404)
      .json({ message: `Contact with id ${contactId} not found` });
  }
  try {
    const deletedContact = await removeContact(contactId);
    res.json({
      message: "contact deleted",
      deletedContact,
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong, Not found" });
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  changeContact,
  deleteContact,
};
