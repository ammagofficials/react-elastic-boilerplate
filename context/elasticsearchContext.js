// context/elasticsearchContext.js
const client = require('../config/elasticsearch');
const { v4: uuidv4 } = require('uuid');
class ElasticsearchContext {
  constructor() {
    this.bulkOperations = [];
  }

  async getIndexName(entity) {
    const modelName = entity.constructor.name; // Automatically get model name
    return `${process.env.ELASTICSEARCH_ALIES}-${modelName.toLowerCase()}`;
  }

  async create(entity) {
    const index = await this.getIndexName(entity);
    entity.id = uuidv4();//auto generated unique Id
    this.bulkOperations.push({ create: { _index: index, _id: entity.id } });
    this.bulkOperations.push(entity);
  }

  async saveChanges() {
    if (this.bulkOperations.length === 0) return;

    const { body: response } = await client.bulk({
      refresh: true,
      body: this.bulkOperations,
    });

    this.bulkOperations = [];
    return response;
  }

  async findById(entityClass, id) {
    const index = await this.getIndexName({ constructor: { name: entityClass.name } });
    const { body } = await client.get({ index, id });
    return body._source ? new entityClass(body._source) : null;
  }

  async search(entityClass, query) {
    const index = await this.getIndexName({ constructor: { name: entityClass.name } });
    const { body } = await client.search({
      index,
      body: { query }
    });
    return body.hits.hits.map(hit => new entityClass(hit._source));
  }

  async delete(entityClass, id) {
    const index = await this.getIndexName({ constructor: { name: entityClass.name } });
    this.bulkOperations.push({ delete: { _index: index, _id: id } });
  }
}

module.exports = new ElasticsearchContext();
