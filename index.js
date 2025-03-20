import express from "express";
import cors from "cors";
import qr from "qr-image";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(cors()); // Allow requests from frontend
app.use(bodyParser.json()); // Parse JSON body

// Generate QR Code API
app.post("/generate", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const qr_svg = qr.image(url, { type: "png" });
    res.setHeader("Content-Type", "image/png");
    qr_svg.pipe(res); // Send the PNG image as response
  } catch (error) {
    res.status(500).json({ error: "QR generation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
