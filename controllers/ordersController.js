const { Order } = require('../models');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const orderData = {
      order_id: uuidv4(),
      ...req.body
    };
    
    const order = await Order.create(orderData);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrderSchema = Joi.object({
  paymentMethod: Joi.string().required(),
  paymentStatus: Joi.string().required(),
});

exports.updateOrder = async (req, res) => {
  // Validate request body
  const { error } = updateOrderSchema.validate(req.body);
  if (error) {
    console.error('Validation error:', error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const id = req.params.id;
    console.log('Updating order with id:', id); // Logging untuk memastikan id dibaca dengan benar

    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }

    const [updated] = await Order.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedOrder = await Order.findOne({ where: { id: id } });
      if (updatedOrder) {
        res.status(200).json(updatedOrder);
      } else {
        console.error('Order not found with id:', id);
        res.status(404).json({ error: 'Order not found' });
      }
    } else {
      console.error('Order not found with id:', id);
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating order:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
