import { attach, createEffect } from 'effector';
import { NavigateFunction } from 'react-router/lib/hooks';
import { createGate, useGate } from 'effector-react';
import { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { debug } from 'patronum';

const navigateGate = createGate<NavigateFunction>();

type NavigateFxType = { to: string; navigate: NavigateFunction };

const navigateToFx = attach({
  effect: createEffect(({ to, navigate }: NavigateFxType) => {
    navigate(to);
  }),
  source: navigateGate.state,
  mapParams: (to: string, navigate: NavigateFunction) => ({ to, navigate }),
});

const attachNavigate = (RoutingComponent: ComponentType<any>) => {
  return function AttachNavigate() {
    const navigate = useNavigate();
    useGate(navigateGate, navigate);
    return <RoutingComponent />;
  };
};

const createNavigateFx = (to: string) =>
  attach({
    effect: navigateToFx,
    mapParams: () => to,
  });

debug({ navigateToFx });

export { navigateGate, navigateToFx, attachNavigate, createNavigateFx };
