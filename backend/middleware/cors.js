const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "https://sudoa.crabdance.com",
  "https://api.sudoa.crabdance.com",
  "https://www.sudoa.crabdance.com",
];

const corsSettings = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      origin.includes("18-web-project-api-full-frontend") &&
      origin.includes("vercel.app")
    ) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsSettings;
