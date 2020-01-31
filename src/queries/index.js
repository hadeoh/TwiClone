import fs from "fs";
import Query from "./query";

// get working models from working directory
const directoryPath = `${process.cwd()}/src/models`;

const AllModels = fs.readdirSync(directoryPath, (err, files) => {
  if (err) console.log(err);
  return files;
});

// get working models from working directory
const builderObject = AllModels.reduce((accumulator, file) => {
  // get every model from the model folder
  const Model = require(`../models/${file}`);

  // get model name
  const [fileName] = file.split(".");

  // attach query word to every model name
  const queryBuilderName = `${fileName.charAt(0).toUpperCase()}${fileName.slice(1)}Query`;

  // sync model to general query methods
  const ModelQuery = new Query(Model);

  // attach synced model to accumulator
  accumulator[queryBuilderName] = ModelQuery;
  return accumulator;
}, {});


// export synched model for use on controller
export default builderObject;