import packageInfo from '../../../package.json';

export const GET = async () => Response.json({ message: 'ok', version: packageInfo.version });
