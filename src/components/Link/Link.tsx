import { 
  classNames,
  //useUtils
  openLink
} from '@telegram-apps/sdk-react';
import { type FC, type MouseEventHandler, useCallback } from 'react';
import { Link as RouterLink, type LinkProps } from 'react-router-dom';

import './Link.css';

export const Link: FC<LinkProps> = ({
  className,
  onClick: propsOnClick,
  to,
  ...rest
}) => {
  //const utils = useUtils();

  const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>((e) => {
    propsOnClick?.(e);

    // Рассчитать, если целевой путь является внешним. В этом случае мы хотели бы открыть ссылку,
    // используя метод TMA.
    let path: string;
    if (typeof to === 'string') {
      path = to;
    } else {
      const { search = '', pathname = '', hash = '' } = to;
      path = `${pathname}?${search}#${hash}`;
    }

    const targetUrl = new URL(path, window.location.toString());
    const currentUrl = new URL(window.location.toString());
    const isExternal = targetUrl.protocol !== currentUrl.protocol
      || targetUrl.host !== currentUrl.host;

    if (isExternal) {
      e.preventDefault();
      openLink(targetUrl.toString());
    }
  }, [to, propsOnClick]);

  return (
    <RouterLink
      {...rest}
      to={to}
      onClick={onClick}
      className={classNames(className, 'link')}
    />
  );
};
