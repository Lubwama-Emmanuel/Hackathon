const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Doctor = require('../models/doctorModel');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

const createSignToken = (doctor, statusCode, res) => {
  const token = signToken(doctor.id);
  res.status(statusCode).json({
    data: {
      status: 'Success',
      token,
      doctor,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newDoctor = await Doctor.create(req.body);

  createSignToken(newDoctor, 200, res);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const doctor = await Doctor.findOne({ email }).select('+password');

  if (!doctor) {
    return next(new AppError('Incorrect password or Email'));
  }
  const token = signToken(doctor.id);
  res.status(200).json({
    token,
  });
});