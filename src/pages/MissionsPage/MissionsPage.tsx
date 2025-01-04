import { CSSProperties, FC, useEffect, useState } from 'react';
import './MissionsPage.css';
import { openTelegramLink, shareURL, useLaunchParams } from '@telegram-apps/sdk-react';
import { Cell, List} from '@telegram-apps/telegram-ui';
import { Button } from 'antd-mobile';
import { ChevronRight, Check2, Exclamation, Share, ArrowClockwise } from 'react-bootstrap-icons';
import { botMethod } from '@/api/bot/methods';

interface Mission {
  id: number;
  title: string;
  after?: string;
  cb?: () => string;
}

export const MissionsPage: FC = () => {
  const LP = useLaunchParams();
  const ID = LP.initData;
  
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: 'Подписаться на новости',
      after: 'waiting', // 'waiting', 'success', 'error', 'checking', 'share'
      cb: () => {
        console.log('%ccasebook{killer} channel', `color: pink`);
        let formData = new FormData();
        console.log(ID?.user?.id);
        formData.append('chat_id', '-1002212964660');
        formData.append('user_id', ID?.user?.id.toString() || '');
        botMethod(
          'getChatMember',
          formData
        ).then((result: any) => {
          console.log(result);
          console.log(result.payload?.result?.status);
          if (result.payload?.result?.status === 'member') {
            setAfter(1, 'success');
          } else {
            setAfter(1, 'waiting');
            if (openTelegramLink.isAvailable()) {
              openTelegramLink('https://t.me/casebookkiller');
            }
          }
        }).catch((error) => {
          console.log(error);
          setAfter(1, 'error');
        })
        return 'checking';
      }
    },
    {
      id: 2,
      title: 'Поделиться',
      after: 'share',
      cb: () => {
        const url = 'https://github.com/casebookkiller/reactjs-template';
        const msg = `Шаблон для создания telegram-приложения: ${url}`;
        shareURL(msg);
        return 'share';
      }
    }
  ]);

  function setAfter(id: number, after: string) {
    setMissions((missions) => missions.map((mission) => mission.id === id ? {...mission, after} : mission));
  }

  function checkMission(task: Mission) {
    console.log('%cid: %o', `color: yellow`, task.id);
    const status = task.cb ? task.cb(): 'waiting';
    
    return status; //'waiting', 'success', 'error', 'checking', 'share'
  }

  function updateMissions() {
    setMissions((missions) => {
      return missions.map((mission) => {
        return {...mission, after: checkMission(mission)};
      });
    });
  }

  useEffect(() => {
    updateMissions();
  }, []);
  
  const cssDefault: CSSProperties = {
    width: '60vw',
    position: 'relative',
    background: 'transparent',
    borderColor: 'var(--tgui--link_color)',
    color: 'var(--tgui--link_color)',
  };

  const cssSuccess: CSSProperties = {
    width: '60vw',
    position: 'relative',
    background: 'transparent',
    borderColor: 'var(--tg-theme-hint-color)',
    color: 'var(--tg-theme-hint-color)',
    cursor: 'not-allowed',
  }

  const items = missions.map((mission) => {
    const { id, title, after, cb } = mission;
    return (
        <Cell
          style={{width: '100%'}}
          key={id}
        >
          <Button
            style={after === 'success' ? cssSuccess : cssDefault}
            onClick={()=>{cb?.()}}
          >
          <div className="flex flex-1" style={{width: '100%'}}>
            <div className="flex-left-80">{title}</div>
            <div className='flex-right-20'>
              {after === 'waiting' && <ChevronRight style={{position: 'relative', marginLeft: '0.5rem', top: '0.2rem', width: '1rem', height: '1rem', stroke: 'var(--tg-theme-accent-text-color)'}} strokeWidth="2" fill="var(--tg-theme-accent-text-color)"/>}
              {after === 'checking' && <ArrowClockwise style={{marginLeft: '0.5rem', top: '0.2rem', width: '1rem', height: '1rem'}} strokeWidth="4" fill="var(--surface-ground)"/>}
              {after === 'success' && <Check2 style={{position: 'relative', marginLeft: '0.5rem', top: '0.2rem', width: '1rem', height: '1rem', stroke: 'var(--tg-theme-hint-color)'}} strokeWidth="2" fill="var(--tg-theme-accent-text-color)"/>}
              {after === 'error' && <Exclamation style={{position: 'relative', marginLeft: '0.5rem', top: '0.2rem', width: '1rem', height: '1rem', stroke: 'var(--tg-theme-destructive-text-color)'}} strokeWidth="1"/>}
              {after === 'share' && <Share style={{position: 'relative', marginLeft: '0.5rem', top: '0.2rem', width: '1rem', height: '1rem', stroke: 'var(--tg-theme-accent-text-color)'}} strokeWidth="1"/>}
            </div>
          </div>
          </Button>
        </Cell>
    );
  });

  return (
    <div className="MissionsPage">
      <List>
        {items}
      </List>
    </div>
  );
};
