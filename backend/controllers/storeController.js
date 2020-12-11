const Store = require('../models/storeModel');
const User = require('../models/userModel');
const Stream = require('../models/schemaTypes/streamSchemaType');
const UserVariables = require('../models/schemaTypes/userSchemaType');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Post Stores
exports.createStore = catchAsync(async (req, res, next) => {
  req.body.userId = req.user.id;
  const doc = await Store.create(req.body);
  const user = await User.findByIdAndUpdate(req.user.id, {
    ...req.body.userId,
    storeId: doc.id,
  });
  res.status(201).json({ status: 'success', user, data: doc });
});

//Get All Stores by User
exports.getAllStores = catchAsync(async (req, res, next) => {
  let query = Store.findOne({ userId: req.user.id });
  const doc = await query;
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  return res.status(200).json({ status: 'success', data: { store } });
});

//GET a Specific Store by Store ID
exports.getStore = catchAsync(async (req, res, next) => {
  let query = Store.findOne({ userId: req.user.id });
  const doc = await query;
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.saveStore = catchAsync(async (req, res, next) => {
  const doc = await Store.findByIdAndUpdate(req.user.storeId, { ...req.body });
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  doc.save();
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

// Delete Store
exports.deleteStore = catchAsync(async (req, res, next) => {
  const store = await Store.findById(req.params.id);
  if (!store) {
    return new AppError('Store not found', 404);
  }
  if (String(req.user._id) === String(store.user)) {
    await store.remove();

    res.status(201).json({
      status: 'success',
      data: null,
    });
  } else {
    res.status(403).json({
      status: 'fail',
      message: 'User is not authorized to delete this store',
    });
  }
});
