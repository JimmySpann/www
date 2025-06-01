// const fs = require('fs');
// const path = require('path');

function removeFileExtension(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}

// function saveFileListToTxt() {
//   const currentDirectory = __dirname;
//   const fileList = fs.readdirSync(currentDirectory);
//   const txtFilePath = path.join(currentDirectory, 'fileList.txt');

//   const directoryName = path.basename(currentDirectory);

//   var result = [];

//   let appendFront = "* @requiredAssets img/" + directoryName + "/";


//   var line = "";

//   for(let file of fileList) {
//     if(file == "MakeAssetsListForParameters.js") continue;
//     if(file == "fileList.txt") continue;
//     if(!file.toLowerCase().includes(".png")) continue;
//     line = appendFront + removeFileExtension(file);
//     result.push(line);
//   }

//   const fileContent = result.join('\n');

//   fs.writeFileSync(txtFilePath, fileContent);
//   console.log('File list saved to: ', txtFilePath);
// }

//* @requiredAssets img/pictures/JoystickBase

// saveFileListToTxt();