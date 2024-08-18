import { messaging } from '@extension/shared';

export function addMessageHandler() {
  messaging.addMessageHandler({
    Greeting: async ({ name }) => {
      return `Hello, ${name}!`;
    },
    SearchWeather: async payload => {
      return await searchWeather(payload.search);
    },
  });
}

/**
 * This is just a sample API call(fake api)
 */
async function searchWeather(searchKeyword: string) {
  const res = await fetch(`https://freetestapi.com/api/v1/weathers?search=${searchKeyword}`);
  return await res.json();
}
