const express = require('express');
const router = express.Router();
const laundriesController = require('../../controllers/laundriesController');

router.get('/', laundriesController.getAllLaundries);
router.get('/:id', laundriesController.getLaundryById);
router.post('/', laundriesController.createLaundry);
router.put('/:id', laundriesController.updateLaundry);
router.delete('/:id', laundriesController.deleteLaundry);

module.exports = router;
