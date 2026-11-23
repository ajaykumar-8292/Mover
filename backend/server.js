
// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Home Route
// app.get("/", (req, res) => {
//   res.send("HANS Packers and Movers Backend Running");
// });

// // Office Relocation API
// app.post("/api/relocation", (req, res) => {
//   const { fullName, mobile, fromLocation, toLocation, movingDate } = req.body;

//   if (!fullName || !mobile || !fromLocation || !toLocation || !movingDate) {
//     return res.status(400).json({
//       success: false,
//       message: "Please fill all relocation fields"
//     });
//   }

//   console.log("New Relocation Request:", req.body);

//   res.status(201).json({
//     success: true,
//     message: "Relocation request submitted successfully!"
//   });
// });

// // Contact Form API
// app.post("/api/contact", (req, res) => {
//   const { fullName, mobile, email, movingFrom, movingTo, message } = req.body;

//   if (!fullName || !mobile || !email || !movingFrom || !movingTo || !message) {
//     return res.status(400).json({
//       success: false,
//       message: "Please fill all contact form fields"
//     });
//   }

//   console.log("New Contact Request:", req.body);

//   res.status(201).json({
//     success: true,
//     message: "Your message has been submitted successfully!"
//   });
// });

// // Start Server
// const PORT = 5001;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });







const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Contact Form Schema
const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  movingFrom: { type: String, required: true },
  movingTo: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

// service Form Schema
const serviceSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  fromLocation: { type: String, required: true },
  toLocation: { type: String, required: true },
  movingDate: { type: String, required: true }
}, { timestamps: true });

// MongoDB Models
const Contact = mongoose.model("Contact", contactSchema);
const Service = mongoose.model("Service", serviceSchema);

// Home Route
app.get("/", (req, res) => {
  res.send("HANS Packers and Movers Backend Running");
});

// Office service API
app.post("/api/service", async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      fromLocation,
      toLocation,
      movingDate
    } = req.body;

    if (!fullName || !mobile || !fromLocation || !toLocation || !movingDate) {
      return res.status(400).json({
        success: false,
        message: "Please fill all relocation fields"
      });
    }

    const newservice = new Service({
      fullName,
      mobile,
      fromLocation,
      toLocation,
      movingDate
    });

    await newService.save();

    console.log("New Service Request Saved:", newService);

    res.status(201).json({
      success: true,
      message: "Service request submitted successfully!"
    });

  } catch (error) {
    console.log("Service Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Service request could not be saved"
    });
  }
});

// Contact Form API
app.post("/api/contact", async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      movingFrom,
      movingTo,
      message
    } = req.body;

    if (!fullName || !mobile || !email || !movingFrom || !movingTo || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all contact form fields"
      });
    }

    const newContact = new Contact({
      fullName,
      mobile,
      email,
      movingFrom,
      movingTo,
      message
    });

    await newContact.save();

    console.log("New Contact Request Saved:", newContact);

    res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully!"
    });

  } catch (error) {
    console.log("Contact Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Contact form could not be saved"
    });
  }
});

// MongoDB Connection and Server Start
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });
