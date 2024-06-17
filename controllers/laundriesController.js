const { Laundry } = require('../models');

exports.getAllLaundries = async (req, res) => {
  try {
    const laundries = await Laundry.findAll();
    res.json(laundries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLaundryById = async (req, res) => {
  try {
    const laundry = await Laundry.findByPk(req.params.id);
    if (laundry) {
      res.json(laundry);
    } else {
      res.status(404).json({ error: 'Laundry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLaundry = async (req, res) => {
  try {
    const laundry = await Laundry.create(req.body);
    res.status(201).json(laundry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLaundry = async (req, res) => {
  try {
    const [updated] = await Laundry.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedLaundry = await Laundry.findByPk(req.params.id);
      res.status(200).json(updatedLaundry);
    } else {
      res.status(404).json({ error: 'Laundry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLaundry = async (req, res) => {
  try {
    const deleted = await Laundry.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Laundry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
