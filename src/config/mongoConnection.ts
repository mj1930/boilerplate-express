import mongoose, { ConnectOptions } from "mongoose";
const mongoUrl: string = process.env.MONGO_URL || "";
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

export const connectMongo = async () => {
  await mongoose.connect(mongoUrl, connectionOptions as ConnectOptions).then((res) => {
    console.log(
      'Connected to University slot API Database - Initial Connection'
    );
  }).catch((err) => {
    console.log(
      `Initial  University slot API Database connection error occured -`,
      err
    );
  });
}