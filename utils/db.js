const mongoose = require("mongoose");

const db_connect = async () => {
  try {
    const uri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_PROD_URI
        : process.env.MONGO_DEV_URI;

    await mongoose.connect(uri);
    console.log(`${process.env.NODE_ENV} database connected`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = db_connect;
