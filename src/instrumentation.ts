const { version } = require("../package.json");

export const register = () => {
  console.log(`Running v: ${version} : ${process.env.NODE_ENV}`);
};
