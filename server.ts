import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Enable JSON body parsing
app.use(express.json());

// Log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Proxy endpoints to Fegno Loyalty Engine
const TARGET_API_BASE = "https://loyality-engine.devnew.fegno.com:2096/api/v1";

// Helper to handle response forwarding
async function handleProxyRequest(
  method: string,
  subPath: string,
  body?: any,
  authHeader?: string
) {
  const url = `${TARGET_API_BASE}${subPath}`;
  console.log(`Proxying ${method} request to: ${url}`);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body && Object.keys(body).length > 0) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type");
    let responseData;

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = { message: await response.text() };
    }

    return {
      status: response.status,
      data: responseData,
    };
  } catch (error: any) {
    console.error(`Proxy request failed:`, error);
    return {
      status: 502,
      data: {
        error: "Bad Gateway",
        message: "Failed to connect to the loyalty engine backend API.",
        details: error.message,
      },
    };
  }
}

// 1. Send OTP Proxy
app.post("/api/proxy/auth/send-otp", async (req, res) => {
  const { cellular } = req.body;
  if (!cellular) {
    res.status(400).json({ error: "Validation Error", message: "cellular phone number is required" });
    return;
  }
  const result = await handleProxyRequest("POST", "/auth/send-otp", { cellular });
  res.status(result.status).json(result.data);
});

// 2. Verify OTP Proxy
app.post("/api/proxy/auth/verify-otp", async (req, res) => {
  const { cellular, otp_code } = req.body;
  if (!cellular || !otp_code) {
    res.status(400).json({ error: "Validation Error", message: "cellular and otp_code are required" });
    return;
  }
  const result = await handleProxyRequest("POST", "/auth/verify-otp", { cellular, otp_code });
  res.status(result.status).json(result.data);
});

// 3. Delete Account Proxy
app.delete("/api/proxy/auth/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized", message: "Authorization header is required" });
    return;
  }
  const result = await handleProxyRequest("DELETE", "/auth/me", undefined, authHeader);
  res.status(result.status).json(result.data);
});

// 4. Support Contact Proxy
app.post("/api/proxy/support/contact", async (req, res) => {
  const authHeader = req.headers.authorization;
  const result = await handleProxyRequest("POST", "/support/contact", req.body, authHeader);
  res.status(result.status).json(result.data);
});

// Serve static assets and frontend pages
async function start() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
});
