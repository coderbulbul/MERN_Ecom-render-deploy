// Import dependencies
const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    // check data
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // create instance of address
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    // check data
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id required!",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    // check data
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is not found",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// delete functionality
const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  // check data
  if (!userId || !addressId) {
    return res.status(400).json({
      success: false,
      message: "User and address id is not found",
    });
  }

  const address = await Address.findOneAndDelete({
    _id: addressId,
    userId,
  });

  if (!address) {
    return res.status(404).json({
      success: false,
      message: "Address deleted successfully",
    });
  }

  res.status(200).json({
    success: true,
    message: address,
  });

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };
