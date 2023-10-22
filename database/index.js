const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_SERVER);
    console.log(
      "db connected Successfully and db name is ",
      connection.connection.name
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  ConnectDB,
};
