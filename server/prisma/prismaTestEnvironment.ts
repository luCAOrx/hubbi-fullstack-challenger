import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { Client } from "pg";

export class PrismaTestEnvironment {
  private schema: string;
  private connectionString: string;

  constructor() {
    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASSWORD;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbName = process.env.DATABASE_NAME;

    this.schema = `test_${randomUUID()}`;
    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    process.env.DATABASE_URL = this.connectionString;

    execSync("npm run prisma:migrate");
    execSync("npm run prisma:seed:test");
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}
