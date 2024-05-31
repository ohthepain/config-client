
import { readFileSync, writeFileSync } from 'fs';
import { sanitize } from 'hast-util-sanitize';

function generateModelClass(className, schemaPath, outputPath) {
    const schema = readFileSync(schemaPath, 'utf-8');
    const modelStart = schema.indexOf(`model ${className}`);
    if (modelStart === -1) {
        throw new Error(`Model ${className} not found in schema`);
    }

    const modelEnd = schema.indexOf('}', modelStart);
    const modelDef = schema.slice(modelStart, modelEnd);
    const lines = modelDef.split('\n');
    const fields = lines.slice(1, -1).map(line => line.trim().split(' ')[0]);

    let classDef = `export class ${className} {\n`;
    for (const field of fields) {
        if (field && field[0] !== '@' && field[0] !== '/') {
            classDef += `  ${field}: any;\n`;
        }
    }

    classDef += `\n  constructor(data: any) {\n`;
    for (const field of fields) {
        if (field && field[0] !== '@' && field[0] !== '/') {
            classDef += `    this.${field} = data.${field};\n`;
        }
    }
    classDef += '  }\n';
    classDef += '}\n';

    writeFileSync(outputPath, classDef);
}

function getModelNames(schemaPath) {
    const schema = readFileSync(schemaPath, 'utf-8');
    const lines = schema.split('\n');
    const modelLines = lines.filter(line => line.startsWith('model '));
    const modelNames = modelLines.map(line => line.split(' ')[1]);
    return modelNames;
}

const schemaPath = process.argv[2];
console.log(`Generating models from schema: ${schemaPath}`);
const modelNames = getModelNames(schemaPath);
modelNames.forEach(modelName => {
    console.log(modelName);
    generateModelClass(modelName, './schema.prisma', `./src/models/${modelName}.ts`);
});
