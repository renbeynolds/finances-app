import { PostgreSqlContainer } from 'testcontainers';
import postgresDB from '../../src/postgresDB';

export class TestDB {
  private container = null;

  constructor() {}

  public async create() {
    this.container = await new PostgreSqlContainer().start();
    postgresDB.setOptions({
      host: this.container.getHost(),
      port: this.container.getPort(),
      username: this.container.getUsername(),
      password: this.container.getPassword(),
      database: this.container.getDatabase(),
    });
    await postgresDB.initialize();
  }

  public async destroy() {
    await this.container.stop();
  }
}
