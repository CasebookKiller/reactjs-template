import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';

import tonSvg from './ton.svg';

export const IndexPage: FC = () => {
  return (
    <List>
      <Section
        header='Особенности'
        footer='Вы можете воспользоваться этими страницами, чтобы узнать больше о функциях, предоставляемых мини-приложениями Telegram и другими полезными проектами'
      >
        <Link to='/ton-connect'>
          <Cell
            before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
            subtitle='Подключите свой кошелек TON'
          >
            TON Connect
          </Cell>
        </Link>
      </Section>
      <Section
        header='Данные о запуске приложения'
        footer='Эти страницы помогают разработчикам узнать больше о текущей информации о запуске'
      >
        <Link to='/init-data'>
          <Cell subtitle='Пользовательские данные, информация о чате, технические данные'>Данные инициализации</Cell>
        </Link>
        <Link to='/launch-params'>
          <Cell subtitle='Идентификатор платформы, версия мини-приложения и т.д.'>Параметры запуска</Cell>
        </Link>
        <Link to='/theme-params'>
          <Cell subtitle='Информация о палитре приложений Telegram'>Параметры темы</Cell>
        </Link>
      </Section>
    </List>
  );
};
