"use client";

import { Amplify } from "aws-amplify";

// Try to load backend configuration, but don't fail if it doesn't exist
let config = {};
try {
  config = require("@/../amplify_outputs.json");
} catch (error) {
  console.warn(
    "Backend configuration not found. Running in frontend-only mode."
  );
  // Use minimal configuration for frontend-only mode
  config = {
    aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
    aws_cognito_region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
  };
}

Amplify.configure(config);

export const ConfigureAmplify = () => {
  return null;
};
