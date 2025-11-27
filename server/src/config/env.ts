import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const config = {
  port: parseInt(process.env.PORT || "5001", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  // ******SET to 'github' to use GitHub storage******
  storageMode: process.env.STORAGE_MODE || "local",
  github: {
    token: process.env.GITHUB_TOKEN,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH || "main",
  },
};

//******************Added this check so that we know if the mode is github but the required env variables are not set*****************************

if (config.storageMode === "github") {
  if (!config.github.token || !config.github.repo) {
    console.warn(
      'Warning: STORAGE_MODE is set to "github" but GITHUB_TOKEN or GITHUB_REPO is missing.'
    );
    console.warn("Falling back to local storage mode.");
    config.storageMode = "local";
  }
}

export default config;
