import { Klyra } from '@klyra/core';

const klyra = new Klyra({
  environment: 'local',
});

export const getKlyra = async () => {
  await klyra.initialize();
  return klyra;
};
