/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

const { version } = require("./package.json");

module.exports = async () => {
  console.log(`v: ${version}`);
  return nextConfig;
};
