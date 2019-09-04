import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';

const models = [User];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = Sequelize(databaseConfig);

    models.map(m => m.init(this.connection));
  }
}

export default new Database();
