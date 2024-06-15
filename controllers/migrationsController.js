const { Migration } = require('../models');

exports.getAllMigrations = async (req, res) => {
  try {
    const migrations = await Migration.findAll();
    res.json(migrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMigrationById = async (req, res) => {
  try {
    const migration = await Migration.findByPk(req.params.id);
    if (migration) {
      res.json(migration);
    } else {
      res.status(404).json({ error: 'Migration not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMigration = async (req, res) => {
  try {
    const migration = await Migration.create(req.body);
    res.status(201).json(migration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMigration = async (req, res) => {
  try {
    const [updated] = await Migration.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedMigration = await Migration.findByPk(req.params.id);
      res.status(200).json(updatedMigration);
    } else {
      res.status(404).json({ error: 'Migration not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMigration = async (req, res) => {
  try {
    const deleted = await Migration.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Migration not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
