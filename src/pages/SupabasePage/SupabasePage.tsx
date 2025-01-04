import { createContext, FC, useContext, useEffect, useState } from 'react';
import './SupabasePage.css';

import Supabase from '../../supabaseClient';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

import { Cell } from '@telegram-apps/telegram-ui';

const SBaseContext = createContext(Supabase);

/**
 * Запись в таблице ids
 */
interface TGRec {
  created_at: string;
  id: number;
  tgid: string;
}

export const SupabasePage: FC = () => {
  const SBase = useContext(SBaseContext); 
  const [ids, setIds] = useState<TGRec[]>([]);

  async function getIds() {
    const result: PostgrestSingleResponse<TGRec[]> = await SBase
      .from("ids")
      .select()
      .lt("id", 10); //первые 10 записей

    console.log('%cids: %o', `color: firebrick; background-color: white`, result.data);  
    
    setIds(result.data||[]);
  }

  useEffect(() => {
    getIds();
  }, []);
  
  function rectifyFormat(s: string) {
    const b = s.split(/\D/);
    return b[0] + '-' + b[1] + '-' + b[2] + 'T' +
           b[3] + ':' + b[4] + ':' + b[5] + '.' +
           b[6].substring(0,3) + '+00:00';
  }

  return (
    <>
      <SBaseContext.Provider value={Supabase}>
        <div className="SupabasePage">
          {ids.map((id) => (
            <Cell
              key={id.id}
              
              description={new Date(rectifyFormat(id.created_at)).toLocaleString()}
            >
              <div>{id.id}</div>
              <div>Пользователь: {id.tgid}</div>
            </Cell>
          ))}
        </div>
      </SBaseContext.Provider>
    </>
  );
};
