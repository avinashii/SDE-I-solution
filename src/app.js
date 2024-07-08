const express = require('express')
const mongoose = require('mongoose')
const uploadroute =  require('./routes/uploadroutes')
const statusRoute =  require('./routes/statusroutes')
const webhookRoute =  require('./routes/webhookroutes')


require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
      .then((c) => console.log(`DB Connected to ${c.connection.host}`))
      .catch((e) => console.log(e));

app.use(express.json());

app.get('/' , (req ,res)=>{
    res.send("working");
})

app.use('/api' , uploadroute);
app.use('/api' , statusRoute);
app.use('/api' , webhookRoute);



app.listen(PORT , () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});