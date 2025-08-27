import express, { Request, Response } from "express";
import { exec } from "child_process";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to trigger Cypress tests
app.post("/run-automation", (req, res) => {
    res.json({ message: "Automation started!" });

  // You can optionally accept spec path from req.body.spec
  const spec = req.body?.spec ? `--spec ${req.body.spec}` : "";
  const cmd = `npx cypress run --browser chrome --headless ${spec}`;

  exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
    }

    console.log("✅ Cypress run complete");
    res.json({ success: true, output: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Automation API server running at http://localhost:${PORT}`);
});
