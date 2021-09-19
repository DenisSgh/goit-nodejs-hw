const fs = require("fs").promises;
const path = require("path");
const contacts = require("./db/contacts.json");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  // const data = await fs.readFile(contactsPath);
  // const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) return null;
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
}

async function updateContact(contactId, name, email, phone) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  const updatedContact = {
    id: contactId,
    name,
    email,
    phone,
  };

  if (idx === -1) return null;
  contacts[idx] = { ...contacts[idx], ...updatedContact };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts[idx];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) return null;
  // contacts.splice(idx, 1);
  // await fs.writeFile(contactsPath, JSON.stringify(contacts));
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return true;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
