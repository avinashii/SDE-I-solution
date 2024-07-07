const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
      .then((c) => console.log(`DB Connected to ${c.connection.host}`))
      .catch((e) => console.log(e));

app.use(express.json());

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});