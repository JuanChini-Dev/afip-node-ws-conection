import { loadTA, saveTA } from './storage.js';
import WSAAService from './wsaa.service.js';

async function getValidTA() {
  const taData = loadTA();

  if (taData) {
    const { token, sign, expiration } = taData;
    const currentTime = new Date();
    const expirationTime = new Date(expiration);

    if (currentTime < expirationTime) {
      return { token, sign };
    }
  }

  // TA has expired or does not exist
  const wsaaService = new WSAAService();
  const newTA = await wsaaService.login();

  if (newTA.error) {
    throw new Error('Failed to obtain new TA');
  }

  saveTA({
    token: newTA.token,
    sign: newTA.sign,
    expiration: new Date(newTA.expiration).toISOString()
  });

  return { token: newTA.token, sign: newTA.sign };
}

export default getValidTA;
