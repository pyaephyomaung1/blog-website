const Monk = require('../models/Monk');

exports.createMonk = async (req, res) => {
  try {
    const monk = await Monk.create(req.body);
    res.status(201).json(monk);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMonks = async (req, res) => {
  try {
    const monks = await Monk.find();
    res.json(monks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};