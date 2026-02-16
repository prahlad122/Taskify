const mongoose = require("mongoose");
const dns = require("dns");

// Force DNS resolution through Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

// const conn = async () => {
//    try {
//      await mongoose.connect(process.env.MONGODB_URL, {
//        family: 4,
//        tls: true,
//        serverSelectionTimeoutMS: 30000,
//      });
//      console.log("DB Connected");
     
//    } catch (error) {
//     console.log(" DB not connected:", error.message);
//    }
// }
const conn = async () => {
   try {
     console.log(" Connection string:", process.env.MONGODB_URL);
     console.log("Database name in URL:", process.env.MONGODB_URL?.split('/')[3]?.split('?')[0]);
     
     await mongoose.connect(process.env.MONGODB_URL, {
       family: 4,
       tls: true,
       serverSelectionTimeoutMS: 30000,
     });
     
     console.log("DB Connected");
     console.log(" Connected to database:", mongoose.connection.name);
     
   } catch (error) {
    console.log("❌ DB not connected:", error.message);
   }       
}

 module.exports = conn;