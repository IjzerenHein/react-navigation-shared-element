import { Route } from '@react-navigation/native';
import {
  SharedElementNode,
  SharedElementAnimation,
  SharedElementResize,
  SharedElementAlign,
  SharedElementTransitionProps,
} from 'react-native-shared-element';

export {
  SharedElementNode,
  SharedElementAnimation,
  SharedElementTransitionProps,
};

export type NavigationEventName =
  | 'focus'
  | 'blur'
  | 'transitionStart'
  | 'transitionEnd';

export type SharedElementEventSubscription = () => void;

export type SharedElementStrictConfig = {
  readonly id: string;
  readonly otherId: string;
  readonly animation: SharedElementAnimation;
  readonly resize?: SharedElementResize;
  readonly align?: SharedElementAlign;
  readonly debug?: boolean;
};

export type SharedElementsStrictConfig = SharedElementStrictConfig[];

export type SharedElementConfig =
  | {
      readonly id: string;
      readonly otherId?: string;
      readonly animation?: SharedElementAnimation;
      readonly resize?: SharedElementResize;
      readonly align?: SharedElementAlign;
      readonly debug?: boolean;
    }
  | string;

export type SharedElementsConfig = SharedElementConfig[];

export type SharedElementRoute<
  RouteName extends string = any,
  Params extends object = any
> = Omit<Route<RouteName>, 'params'> & { params?: Params };

export type SharedElementsComponentConfig<
  Route extends SharedElementRoute = SharedElementRoute<any, any>,
  OtherRoute extends SharedElementRoute = SharedElementRoute<any, any>
> = (
  route: Route,
  otherRoute: OtherRoute,
  showing: boolean
) => SharedElementsConfig | undefined;

export type SharedElementSceneComponent = React.ComponentType<any> & {
  sharedElements?: SharedElementsComponentConfig;
};
