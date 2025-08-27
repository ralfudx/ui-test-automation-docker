"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Endpoint to trigger Cypress tests
app.post("/run-automation", (req, res) => {
    res.json({ message: "Automation started!" });
    // You can optionally accept spec path from req.body.spec
    const spec = req.body?.spec ? `--spec ${req.body.spec}` : "";
    const cmd = `npx cypress run --browser chrome --headless ${spec}`;
    (0, child_process_1.exec)(cmd, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
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
