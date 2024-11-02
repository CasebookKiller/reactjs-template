import { openLink } from '@telegram-apps/sdk-react';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import {
  Avatar,
  Cell,
  List,
  Navigation,
  Placeholder,
  Section,
  Text,
  Title,
} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { DisplayData } from '@/components/DisplayData/DisplayData.tsx';

import './TONConnectPage.css';

export const TONConnectPage: FC = () => {
  console.log('TONConnectPage: ', window.location);
  console.log('history:', history);

  const wallet = useTonWallet();
  
  if (!wallet) {
    return (
      <Placeholder
        className='ton-connect-page__placeholder'
        header='TON Connect'
        description={
          <>
            <Text>
              Для отображения данных, связанных с подключением, необходимо подключить свой кошелек
            </Text>
            <TonConnectButton className='ton-connect-page__button'/>
          </>
        }
      />
    );
  }

  const {
    account: { chain, publicKey, address },
    device: {
      appName,
      appVersion,
      maxProtocolVersion,
      platform,
      features,
    },
  } = wallet;

  return (
    <List>
      {'imageUrl' in wallet && (
        <>
          <Section>
            <Cell
              before={
                <Avatar src={wallet.imageUrl} alt='Логотип провайдера' width={60} height={60}/>
              }
              after={<Navigation>О кошельке</Navigation>}
              subtitle={wallet.appName}
              onClick={(e) => {
                e.preventDefault();
                openLink(wallet.aboutUrl);
              }}
            >
              <Title level='3'>{wallet.name}</Title>
            </Cell>
          </Section>
          <TonConnectButton className='ton-connect-page__button-connected'/>
        </>
      )}
      <DisplayData
        header='Учетная запись'
        rows={[
          { title: 'Адрес', value: address },
          { title: 'Цепь', value: chain },
          { title: 'Публичный ключ', value: publicKey },
        ]}
      />
      <DisplayData
        header='Устройство'
        rows={[
          { title: 'Наименование Приложения', value: appName },
          { title: 'Версия Приложения', value: appVersion },
          { title: 'Максимальная версия протокола', value: maxProtocolVersion },
          { title: 'Платформа', value: platform },
          {
            title: 'Особенности',
            value: features
              .map(f => typeof f === 'object' ? f.name : undefined)
              .filter(v => v)
              .join(', '),
          },
        ]}
      />
    </List>
  );
};
