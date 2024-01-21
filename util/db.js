const mongoose = require("mongoose");

class MongoDb {
  async connect() {
    try {
        const mongoURI = process.env.MONGO_URL
        mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          
          const db = mongoose.connection;
          
          db.on('error', console.error.bind(console, 'MongoDB connection error:'));
          db.once('open', () => {
            console.log('Connected to MongoDB');
          });
    } catch (error) {
      console.log("Mongo db error in connect function ::", error);
    }
  }
}

module.exports = new MongoDb();
