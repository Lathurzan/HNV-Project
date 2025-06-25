const connectMongoose = require('../config/mongoose');
connectMongoose();

const Service = require('../models/serviceModel');

// GET all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

// ADD new service
exports.addService = async (req, res) => {
  try {
    const { title, description, image, active } = req.body;
    if (!title || !description || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newService = new Service({ title, description, image, active });
    await newService.save();
    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add service' });
  }
};

// UPDATE a service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Service.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Service updated successfully', service: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update service' });
  }
};

// DELETE a service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
};

// TOGGLE active status
exports.toggleServiceActive = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    service.active = !service.active;
    await service.save();
    res.status(200).json({ message: 'Service status updated', service });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle status' });
  }
};
