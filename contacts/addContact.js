const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  updateContacts(contacts);

  return newContact;
}

module.exports = addContact;
