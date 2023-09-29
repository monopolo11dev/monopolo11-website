import packageInfo from "../package.json";

export const register = () => {
  console.log(`Running v:${packageInfo.version} : ${process.env.NODE_ENV}`);
};
