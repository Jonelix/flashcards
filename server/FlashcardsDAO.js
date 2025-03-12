const { Sequelize, DataTypes } = require('sequelize');

// 1. Create a shared options object for SSL, logging, etc.
const connectOptions = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
};

// 2. Use DATABASE_URL if present; otherwise fall back to DB_* env vars
let database;
if (process.env.DATABASE_URL) {
  database = new Sequelize(process.env.DATABASE_URL, connectOptions);
} else {
  database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      ...connectOptions
    }
  );
}

// 3. Define your model(s) and sync as before
const Flashcards = database.define('flashcards', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    original: { type: DataTypes.STRING, allowNull: true },
    translation: { type: DataTypes.STRING, allowNull: true }
}, {
    tableName: 'flashcards',
    timestamps: false
});

(async () => {
    await database.sync({ force: false });
})();

class FlashcardsDAO {
    async getAllFlashcards() {
        return await Flashcards.findAll();
    }

    async createFlashcard(original, translation) {
        return await Flashcards.create({ original, translation });
    }

    async deleteFlashcard(id) {
        return await Flashcards.destroy({ where: { id } });
    }
}

module.exports = FlashcardsDAO;
