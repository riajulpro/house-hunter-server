const express = require("express");
const router = express.Router();
const Property = require("../models/propertyModel");

// Route to get all properties
router.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ data: properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a specific property by ID
router.get("/properties/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new property
router.post("/properties", async (req, res) => {
  const property = new Property({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    roomSize: req.body.roomSize,
    picture: req.body.picture,
    availabilityDate: req.body.availabilityDate,
    rentPerMonth: req.body.rentPerMonth,
    phoneNumber: req.body.phoneNumber,
    description: req.body.description,
  });

  try {
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update a specific property by ID
router.patch("/properties/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property) {
      property.set(req.body);
      const updatedProperty = await property.save();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a specific property by ID
router.delete("/properties/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property) {
      await property.remove();
      res.json({ message: "Property deleted" });
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
