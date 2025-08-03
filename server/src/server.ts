import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";
import router from "./apiRouter.js";
import { config } from "./config.js";
import getCors from "./cors.js";
import setupAsyncLocalStorage from "./middleware/als.js";
import collectVisitorInfo from "./middleware/collectVisitorInfo.js";
import errorHandler from "./middleware/errorHandler.js";
import reconstructToken from "./middleware/reconsttructToken.js";
import requestLimit from "./middleware/requestLimit.js";
import setHeaders from "./middleware/setHeaders.js";
import { connectMongo } from "./mongo/connect.js";
import logger from "./service/logger.service.js";

// ============= CONSTANTS =============

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
  publicDir: path.join(__dirname, "../public"),
  i18nDir: path.join(__dirname, "../public/i18n"),
  indexHtml: path.join(__dirname, "../public", "index.html"),
} as const;

const ROUTES = {
  api: "/api",
  i18n: "/i18n",
  clientFallback: "/**",
} as const;

// ============= SERVER SETUP =============

const app = express();
const server = http.createServer(app);

// ============= MIDDLEWARE CONFIGURATION =============

/**
 * Configure CORS middleware
 */
const configureCORS = (app: express.Application) => {
  app.use(getCors(config.env));
};

/**
 * Configure production-specific middleware
 */
const configureProductionMiddleware = (app: express.Application) => {
  if (config.env === "production") {
    app.use(setHeaders);
    app.use(requestLimit as any);
  }
};

/**
 * Configure core middleware stack
 */
const configureCoreMiddleware = (app: express.Application) => {
  app.use(cookieParser());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(reconstructToken);
  app.use(setupAsyncLocalStorage);
  app.use(collectVisitorInfo);
};

/**
 * Configure API routing
 */
const configureAPIRouting = (app: express.Application) => {
  app.use(ROUTES.api, router);
};

/**
 * Configure static file serving
 */
const configureStaticFiles = (app: express.Application) => {
  // Serve i18n files
  app.use(ROUTES.i18n, express.static(PATHS.i18nDir));

  // Environment-specific static file configuration
  if (config.env === "development") {
    configureDevelopmentProxy(app);
  } else if (config.env === "production") {
    configureProductionStatic(app);
  }
};

/**
 * Configure development proxy for Vite
 */
const configureDevelopmentProxy = (app: express.Application) => {
  app.use(
    "/",
    createProxyMiddleware({
      target: config.server.proxy,
      changeOrigin: true,
      ws: true, // proxy websocket
    })
  );
};

/**
 * Configure production static file serving
 */
const configureProductionStatic = (app: express.Application) => {
  app.use(express.static(PATHS.publicDir));
};

/**
 * Configure client-side routing fallback
 */
const configureClientRouting = (app: express.Application) => {
  // Serve index.html for all other routes (SPA fallback)
  app.get(ROUTES.clientFallback, (req, res, next) => {
    res.sendFile(PATHS.indexHtml);
  });
};

/**
 * Configure error handling
 */
const configureErrorHandling = (app: express.Application) => {
  // 404 handler
  app.use(ROUTES.clientFallback, (req, res, next) => {
    const error = new Error(`${req.method} ${req.originalUrl} not found!`);
    next(error);
  });

  // Global error handler
  app.use(errorHandler as any);
};

// ============= APPLICATION SETUP =============

/**
 * Initialize all middleware and routing configuration
 */
const initializeApplication = (app: express.Application) => {
  configureCORS(app);
  configureProductionMiddleware(app);
  configureCoreMiddleware(app);
  configureAPIRouting(app);
  configureStaticFiles(app);
  configureClientRouting(app);
  configureErrorHandling(app);
};

/**
 * Start the HTTP server
 */
const startServer = (server: http.Server) => {
  server.listen(config.server.port, () => {
    logger.info(`Server is up and running on port ${config.server.port}`);
  });
};

/**
 * Initialize database connection
 */
const initializeDatabase = async () => {
  try {
    await connectMongo(config.env);
  } catch (error) {
    logger.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

/**
 * Graceful shutdown handler
 */
const setupGracefulShutdown = (server: http.Server) => {
  const shutdown = (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully...`);
    server.close(() => {
      logger.info("Server closed successfully");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

// ============= APPLICATION INITIALIZATION =============

/**
 * Bootstrap the entire application
 */
const bootstrap = async () => {
  try {
    // Initialize application middleware and routing
    initializeApplication(app);

    // Start the server
    startServer(server);

    // Setup graceful shutdown
    setupGracefulShutdown(server);

    // Initialize database connection
    await initializeDatabase();

    logger.info("Application bootstrap completed successfully");
  } catch (error) {
    logger.error("Failed to bootstrap application:", error);
    process.exit(1);
  }
};

// Start the application
bootstrap();

export { app };
