import express, { Request, Response } from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to trigger Cypress tests
app.post('/run-automation', (req: Request, res: Response) => {

  // You can optionally accept spec path from req.body.spec
  const spec = req.body?.spec ? `--spec ${req.body.spec}` : '';
  const resultsDir = path.join(__dirname, "cypress/results");
  const cmd = `npx cypress run --browser chrome --headless ${spec} --reporter mochawesome --reporter-options 'reportDir=cypress/results,overwrite=false,json=true'`;

  console.log(`▶️ Running Cypress: ${cmd}`);

  exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
    }
    try {
      // read the latest mochawesome json file
      const files = fs.readdirSync(resultsDir).filter(f => f.endsWith(".json"));
      const latest = files.sort((a, b) => fs.statSync(path.join(resultsDir, b)).mtimeMs - fs.statSync(path.join(resultsDir, a)).mtimeMs)[0];

      const raw = fs.readFileSync(path.join(resultsDir, latest), "utf-8");
      const results = JSON.parse(raw);

      const summary = {
        status: "finished",
        totalTests: results.stats.tests,
        totalPassed: results.stats.passes,
        totalFailed: results.stats.failures,
        browserName: "Chrome"
      };

      res.json(summary);
    } catch (parseErr: any) {
      console.error("❌ Failed to parse Cypress results", parseErr);
      res.status(500).json({ status: "error", error: parseErr.message });
    }

    console.log('✅ Cypress run complete');
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Automation API server running at http://localhost:${PORT}`);
});
