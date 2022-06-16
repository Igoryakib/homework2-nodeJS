const fs = require("fs").promises;
const {nanoid} = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, 'contacts.json');
let contacts;

const listContacts = async () => {
  try {
    contacts = JSON.parse(await fs.readFile(contactsPath));
    return contacts;
  } catch (error) {
    return error;
  }
};

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contact = contacts.find((item) => item.id === contactId);
        return contact;
    } catch (error) {
        return error;
    }
};

const removeContact = async (contactId) => {
  try {
    contactsArray = await listContacts();
    const deletedContact = await getContactById(contactId);
    contacts = contactsArray.filter((item) => item.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deletedContact;
  } catch (error) {
    return error;
  }
};

const addContact = async (body) => {
  try {
    const newContact = {
      ...body,
      id: nanoid(),
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    return error;
  }
};

const updateContact = async (contactId, body) => {
    try {
        const contactsArray = await listContacts();
        contacts = contactsArray.map(item => item.id === contactId ? {
            ...item,
            ...body,
            id: item.id,
        } : item);
        fs.writeFile(contactsPath, JSON.stringify(contacts));
        const updatedContact = await getContactById(contactId);
        return updatedContact;
    } catch (error) {
        return error;
    }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
