const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://sudoa.crabdance.com",
  "https://api.sudoa.crabdance.com",
  "https://www.sudoa.crabdance.com",
];

const corsSettings = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  methods: ["GET, POST, PUT, DELETE, PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsSettings;
