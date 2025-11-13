const handleError = (res, error) => {
  // Custom errors (manually thrown)
  if (error.status)
    return res.status(error.status).json({ message: error.message });

  // Validation (Mongoose)
  if (error.name === "ValidationError")
    return res.status(422).json({ message: error.message });

  // Invalid ObjectId or cast issue
  if (error.name === "CastError")
    return res.status(400).json({ message: "Invalid ID format" });

  // Mongo duplicate entry
  if (error.code === 11000)
    return res.status(409).json({ message: "Duplicate entry detected" });

  // Network/DB connection issues
  if (error.name === "MongoNetworkError")
    return res.status(503).json({ message: "Database connection failed" });

  // JWT errors
  if (error.name === "JsonWebTokenError")
    return res.status(401).json({ message: "Invalid token" });

  if (error.name === "TokenExpiredError")
    return res.status(401).json({ message: "Token expired" });

  // Fallback
  res.status(500).json({ message: "Internal Server Error" });
};

export default handleError;
