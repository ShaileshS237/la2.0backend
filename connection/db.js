const mongoose = require("mongoose");
// mongodb+srv://shailesh:<password>@cluster0.exiprdk.mongodb.net/?retryWrites=true&w=majority

const DB =
  "mongodb+srv://shailesh:1JZzOQ21CAxXEEeg@cluster0.exiprdk.mongodb.net/loveakot_db?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then((val) => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });
