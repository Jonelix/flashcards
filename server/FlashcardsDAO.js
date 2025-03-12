const { Sequelize, DataTypes } = require('sequelize');

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {host: process.env.DB_HOST, dialect: 'postgres', dialectOptions: {
      ssl: {require: true, rejectUnauthorized: false}
        },
        logging: false // Disable query logging
    });

const Flashcards = database.define('person', {
        flascard_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        flashcard_string: { type: DataTypes.STRING, allowNull: true }
    }, {
        tableName: 'flashcards', // Ensure Sequelize does not pluralize the table name
        timestamps: false     // Disable automatic createdAt/updatedAt columns if not needed
    });

(async () => {
    await database.sync({ force: false }); // Adjust as needed
})();

class FlashcardsDAO {
    async testFunction() {
        return await Flashcards.findAll();
    }
}

module.exports = FlashcardsDAO;