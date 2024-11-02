import { themeParams } from '@telegram-apps/sdk-react';
import type { FC } from 'react';
import { List } from '@telegram-apps/telegram-ui';

import { DisplayData } from '@/components/DisplayData/DisplayData.tsx';

export const ThemeParamsPage: FC = () => {
  console.log('ThemeParamsPage: ', window.location);
  console.log('history:', history);

  themeParams.mount();

  return (
    <List>
      <DisplayData
        rows={
          Object
            .entries(themeParams.state())
            .map(([title, value]) => ({
              title: title
                .replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
                .replace(/background/, 'bg'),
              value,
            }))
        }
      />
    </List>
  );
};
