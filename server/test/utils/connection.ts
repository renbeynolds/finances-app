import postgresDB from '../../src/postgresDB';

const connection = {
  async create() {
    await postgresDB.initialize();
  },

  async close() {
    await postgresDB.destroy();
  },

  async clear() {
    const entities = postgresDB.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = postgresDB.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
      await repository.query(
        `ALTER SEQUENCE ${entity.tableName}_id_seq RESTART WITH 1`
      );
    });
  },
};
export default connection;
