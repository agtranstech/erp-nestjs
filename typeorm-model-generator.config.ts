//@ts-ignore
import { TypeOrmModelGeneratorConfig } from "typeorm-model-generator";

// Import your TypeORM DataSource configuration (usually from 'data-source.ts')

const config: TypeOrmModelGeneratorConfig = {
  dataSource: "postgresql://local:local@localhost:5432/local", // Use your configured DataSource
  outputPath: "./src/entities", // Where to generate entity files
  controllerPath: "./src/controllers", // Where to generate controllers
  generateEndpoints: true, // Automatically create CRUD endpoints
  // ... other configuration options (see library docs)
};

export default config;
