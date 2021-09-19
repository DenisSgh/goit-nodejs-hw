const contacts = require("../db/contacts.json");

async function listContacts() {
  // const data = await fs.readFile(contactsPath);
  // const contacts = JSON.parse(data);
  return contacts;
}

module.exports = listContacts;
