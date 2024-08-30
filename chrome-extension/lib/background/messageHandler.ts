import { messaging } from '@extension/shared';

export function addMessageHandler() {
  messaging.on('Greeting', async ({ name }) => `Hello, ${name}!`);
  messaging.on('SearchWeather', async ({ search }) => {
    return await searchWeather(search);
  });
}

/**
 * This is just a sample API call(fake api)
 */
async function searchWeather(searchKeyword: string) {
  const res = await fetch(`https://freetestapi.com/api/v1/weathers?search=${searchKeyword}`);
  return await res.json();
}
