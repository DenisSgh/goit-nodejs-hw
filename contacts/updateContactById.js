const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function updateContactById(contactId, name, email, phone) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === +contactId);
  const updatedContact = {
    id: +contactId,
    name,
    email,
    phone,
  };

  if (idx === -1) return null;
  contacts[idx] = { ...contacts[idx], ...updatedContact };
  updateContacts(contacts);

  return contacts[idx];
}

module.exports = updateContactById;
