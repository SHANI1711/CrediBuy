const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

import data from '../backend/data';
// import all of our models - they need to be imported only once
import Product from '../backend/models/productModel';
