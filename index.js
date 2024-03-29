const {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
} = require("./contacts/index");
const { Command } = require("commander");
require("colors");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

(async () => {
  const { action, id, name, email, phone } = options;

  switch (action) {
    case "list":
      try {
        const contacts = await listContacts();
        console.table(contacts);
      } catch (error) {
        console.log(error.message.red);
      }
      break;

    case "get":
      try {
        const contact = await getContactById(id);
        if (!contact) {
          throw new Error("Not found :(");
        }
        console.table(contact);
      } catch (error) {
        console.log(error.message.red);
      }
      break;

    case "add":
      try {
        const contact = await addContact(name, email, phone);
        console.table(contact);
      } catch (error) {
        console.log(error.message.red);
      }
      break;

    case "update":
      try {
        const contact = await updateContactById(id, name, email, phone);
        if (!contact) {
          throw new Error("Not found :(");
        }
        console.table(contact);
      } catch (error) {
        console.log(error.message.red);
      }
      break;

    case "remove":
      try {
        const contact = await removeContact(id);
        if (!contact) {
          throw new Error("Not found :(");
        }
        console.log("Deleted successfully".green);
      } catch (error) {
        console.log(error.message.red);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
})();
