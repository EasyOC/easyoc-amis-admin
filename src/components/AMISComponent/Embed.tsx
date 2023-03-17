import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import { createRoot } from 'react-dom/client';

import { AlertComponent, makeTranslator, render as renderAmis, ToastComponent } from 'amis';

import AmisEnv from '@/services/amis/AmisEnv';
import React from 'react';
type AMIEmbedProps = {
  schema: any;
  amisMounted?: (amisScoped: any) => void;
  trackerFn?: (tracker: any, props: any) => boolean;
  [key: string]: any;
};

const Embed: React.FC<AMIEmbedProps> = (inputProps) => {
  const { schema, amisMounted, trackerFn } = inputProps;
  let container = document.createElement('div');
  const env = { ...AmisEnv } as any;
  const __ = makeTranslator(env?.locale);

  // app 模式自动加 affixOffsetTop
  if (!('affixOffsetTop' in inputProps) && schema.type === 'app') {
    inputProps.affixOffsetTop = 50;
  }

  if (typeof container === 'string') {
    //@ts-ignore
    container = document.querySelector(container) as unknown as HTMLElement;
  }
  if (!container) {
    console.error(__('Embed.invalidRoot'));
    return;
  } else if (container.tagName === 'BODY') {
    const div = document.createElement('div');
    container.appendChild(div);
    container = div;
  }
  container.classList.add('amis-scope');
  const scoped = {};

  let amisProps: any = {};
  function createElements(props: any): any {
    amisProps = {
      ...amisProps,
      ...props,
      scopeRef: (ref: any) => {
        if (ref) Object.assign(scoped, ref);
      },
    };

    return (
      <div className="amis-routes-wrapper">
        <ToastComponent
          position={(env && env.toastPosition) || 'top-right'}
          closeButton={false}
          timeout={5000}
          locale={props?.locale}
          theme={env?.theme}
        />
        <AlertComponent
          locale={props?.locale}
          theme={env?.theme}
          container={() => env?.getModalContainer?.() || container}
        />

        {renderAmis(schema, amisProps, env)}
      </div>
    );
  }

  const root = createRoot(container);
  root.render(createElements(inputProps));

  return Object.assign(scoped, {
    updateProps: (props: any, callback?: () => void) => {
      root.render(createElements(props));
      callback?.();
    },
    unmount: () => {
      root.unmount();
    },
  });
};
export default Embed;
