import fs from 'fs';
import path from 'path';

// Read the Prisma schema file
const schemaPath = process.argv[2]; // path.resolve(__dirname, 'schema.prisma')
const schema = fs.readFileSync(schemaPath, 'utf-8');

// Split the file content into lines
const lines = schema.split('\n');

// Initialize an empty object to hold the enums
const enums = {};
let currentEnum = null;

// Iterate over each line
for (const line of lines) {
  const trimmedLine = line.trim();

  if (trimmedLine.startsWith('enum')) {
    // Start of an enum definition
    currentEnum = trimmedLine.split(' ')[1];
    enums[currentEnum] = [];
  } else if (currentEnum && trimmedLine !== '{' && trimmedLine !== '}') {
    // Enum value
    enums[currentEnum].push(trimmedLine);
  } else if (trimmedLine === '}') {
    // End of an enum definition
    currentEnum = null;
  }
}

// Iterate over the enums object
for (const enumName in enums) {
  // Create a TypeScript file with the enum definition
  const filePath = `./src/models/${enumName}.ts`;    //path.resolve(__dirname, `./src/models/${enumName}.ts`);
  const fileContent = `export enum ${enumName} {\n  ${enums[enumName].join(',\n  ')}\n}`;

  // Write the enum definition to the file
  fs.writeFileSync(filePath, fileContent);
}
