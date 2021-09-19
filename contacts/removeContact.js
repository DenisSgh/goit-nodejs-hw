const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === +contactId);

  if (idx === -1) return null;
  // contacts.splice(idx, 1);
  // await fs.writeFile(contactsPath, JSON.stringify(contacts));
  const newContacts = contacts.filter((contact) => contact.id != +contactId);
  updateContacts(newContacts);

  return true;
}

module.exports = removeContact;
