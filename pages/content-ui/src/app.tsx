import { useEffect, useState } from 'react';
import { Button } from '@extension/ui';
import { messaging, useStorageSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const theme = useStorageSuspense(exampleThemeStorage);

  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  return (
    <div className="flex items-center justify-between bg-blue-100 rounded py-1 px-2">
      <div className="flex gap-1 text-blue-500">
        Edit <strong className="text-blue-700">pages/content-ui/src/app.tsx</strong> and save to reload.
      </div>
      <form
        className="flex gap-2"
        onSubmit={e => {
          e.preventDefault();
          void searchWeather(keyword);
        }}>
        <input
          className="p-1 my-1 rounded"
          placeholder="city"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <Button type="submit" theme={theme}>
          Search Weather
        </Button>
      </form>
    </div>
  );
}

const searchWeather = async (search: string) => {
  const results = await messaging.send('SearchWeather', { search });
  const weatherInfo = results.at(0);
  if (!weatherInfo) {
    alert('No weather information found');
    return;
  }
  alert(`City: ${weatherInfo?.city}, Temperature: ${weatherInfo?.temperature}`);
};
