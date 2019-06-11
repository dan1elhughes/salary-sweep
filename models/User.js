const Sequelize = require("sequelize");
const db = require("../database");
const { Monzo } = require("../api");

class User extends Sequelize.Model {
  async getMonzoClient() {
    return new Monzo({ access_token: this.monzo_access_token }).withAccountId();
  }
}
User.init(
  {
    id: { type: Sequelize.STRING, primaryKey: true },
    monzo_access_token: Sequelize.STRING,
    monzo_expires: Sequelize.DATE,
    monzo_refresh_token: Sequelize.STRING,

    cap: { type: Sequelize.INTEGER, defaultValue: 3000 * 100 },
    pot: { type: Sequelize.STRING, defaultValue: "Sweep test" }
  },
  { sequelize: db, modelName: "user" }
);
module.exports = User;
