const { Laundry } = require('../models');
const { calculateDistance } = require('../utils');

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
  const { id } = req.params;
  const { userLatitude, userLongitude } = req.body;

  try {
    const [updated] = await Laundry.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      // Ambil data laundry yang telah diperbarui
      const updatedLaundry = await Laundry.findByPk(id);

      // Ambil koordinat outlet dari data laundry
      const [outletLatitude, outletLongitude] = updatedLaundry.location.split(',').map(Number);

      // Hitung jarak antara pengguna dan outlet
      const distance = calculateDistance(userLatitude, userLongitude, outletLatitude, outletLongitude);

      // Update jarak pada data laundry
      await Laundry.update({ distance: distance }, {
        where: { id: id },
      });

      // Ambil data laundry yang telah diperbarui dengan jarak baru
      const updatedLaundryWithDistance = await Laundry.findByPk(id);

      res.status(200).json(updatedLaundryWithDistance);
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
