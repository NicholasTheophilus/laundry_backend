const express = require('express');
const router = express.Router();
const migrationsController = require('../controllers/migrationsController');

router.get('/', migrationsController.getAllMigrations);
router.get('/:id', migrationsController.getMigrationById);
router.post('/', migrationsController.createMigration);
router.put('/:id', migrationsController.updateMigration);
router.delete('/:id', migrationsController.deleteMigration);

module.exports = router;
