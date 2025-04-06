import express from "express";
import cors from "cors";
import qr from "qr-image";
import bodyParser from "body-parser";

const app = express();

//const PORT = 3000;

//new
app.use(cors());
app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.json());

app.post("/generate", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const qr_svg = qr.image(url, { type: "png" });
    res.setHeader("Content-Type", "image/png");
    qr_svg.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "QR generation failed" });
  }
});

//new2
export default app;

/* app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); */

//new4
app.get("/", (req, res) => {
  res.send(
    "QR Code Generator API is running! Use POST /generate to create QR codes"
  );
});


//new3
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Local server running on http://localhost:${PORT}`);
  });
}
