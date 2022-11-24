const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Technician = require('../models/technicianModel');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

const createSignToken = (technician, statusCode, res) => {
  const token = signToken(technician.id);
  res.status(statusCode).json({
    data: {
      status: 'Success',
      token,
      technician,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newtechnician = await Technician.create(req.body);

  createSignToken(newtechnician, 200, res);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const technician = await Technician.findOne({ email }).select('+password');

  if (!technician) {
    return next(new AppError('Incorrect password or Email'));
  }
  const token = signToken(technician.id);
  res.status(200).json({
    token,
  });
});