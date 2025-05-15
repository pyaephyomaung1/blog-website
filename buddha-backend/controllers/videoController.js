const Video = require('../models/Video');

exports.createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('monk');
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};