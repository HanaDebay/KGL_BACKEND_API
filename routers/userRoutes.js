const router = require('express').Router();
const { User } = require('../models/UserModel.js');
const bcrypt = require('bcrypt');

// Register a new user
