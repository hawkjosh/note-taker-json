const fs = require('fs');
const util = require('util');

// Setting up ability to display existing notes using fs.readFile
const readNote = util.promisify(fs.readFile);

// Setting up ability to post new note using fs.writeFile
const writeNote = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (error) => {
    if (error) {
      return;
    }
  });

// Setting up ability to delete note using combination of fs.readFile and fs.writeFile
const updateNote = (content, file) => {
  fs.readFile(file, 'utf8', (error, data) => {
  if (error) {
    return;
  } else {
      const jsonParse = JSON.parse(data);
      jsonParse.push(content);
      writeNote(file, jsonParse);
    }
  });
};

module.exports = { readNote, writeNote, updateNote };