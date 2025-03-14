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

const Tags = database.define('tags', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'tags',
  timestamps: false
});

const FlashcardTags = database.define('flashcard_tags', {
  flashcard_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Flashcards,
          key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      primaryKey: true
  },
  tag_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Tags,
          key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      primaryKey: true
  }
}, {
  tableName: 'flashcard_tags',
  timestamps: false
});

Flashcards.belongsToMany(Tags, { 
  through: FlashcardTags, 
  foreignKey: 'flashcard_id'
});

Tags.belongsToMany(Flashcards, { 
  through: FlashcardTags, 
  foreignKey: 'tag_id'
});



(async () => {
    await database.sync({ force: false });
})();

class FlashcardsDAO {
    //FLASHCARD FUNCTIONS
    async getAllFlashcards() {
        return await Flashcards.findAll();
    }

    async getFlashcard(id) {
        return await Flashcards.findByPk(id);
    }

    async createFlashcard(original, translation) {
        return await Flashcards.create({ original, translation });
    }

    async deleteFlashcard(id) {
        return await Flashcards.destroy({ where: { id } });
    }

    async updateFlashcard(id, original, translation) {
        return await Flashcards.update({ original, translation }, { where: { id } });
    }

    //TAG FUNCTIONS
    async getAllTags() {
      return await Tags.findAll();
    }

    async getTag(id) {
      return await Tags.findByPk(id);
    }


    async createTag(tag) {
      return await Tags.create({ tag });
    }

    async deleteTag(id) {
      return await Tags.destroy({ where: { id } });
    }

    async updateTag(id, tag) {
      return await Tags.update({ tag }, { where: { id } });
    }

    //FLASHCARD TAG FUNCTIONS
    async getFlashcardTags(flashcard_id) {
      return await FlashcardTags.findAll({ where: { flashcard_id } });
    }

    async getTagFlashcards(tag_id) {
      return await FlashcardTags.findAll({ where: { tag_id } });
    }

    async createFlashcardTag(flashcard_id, tag_id) {
      return await FlashcardTags.create({ flashcard_id, tag_id });
    }

    async deleteFlashcardTag(flashcard_id, tag_id) {
      return await FlashcardTags.destroy({ where: { flashcard_id, tag_id } });
    }

}

module.exports = FlashcardsDAO;
