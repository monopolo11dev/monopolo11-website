import packageInfo from "../../../package.json";

export const GET = async () => {
  return Response.json({ message: "ok", version: packageInfo.version });
};
