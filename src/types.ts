import {
  SharedElementNode,
  SharedElementAnimation,
  SharedElementResize,
  SharedElementAlign,
  SharedElementTransitionProps,
} from "react-native-shared-element";

export {
  SharedElementNode,
  SharedElementAnimation,
  SharedElementTransitionProps,
};

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

export type SharedElementAnimatedValue = any;

export type SharedElementRoute = {
  key: string;
  name: string;
  params: {
    [key: string]: any;
  };
};

export interface SharedElementCompatRoute {
  /**
   * Key of the screen.
   */
  readonly key: string;

  /**
   * Route name of this screen.
   */
  readonly name: string;

  /**
   * Params for this route.
   */
  readonly params: {
    [key: string]: any;
  };

  /**
   * @deprecated
   * Gets the parameter by its name.
   */
  getParam(name: string): any;

  /**
   * @deprecated
   * Gets the navigation state.
   */
  readonly state: {
    readonly key: string;
    readonly routeName: string;
    readonly params: {
      [key: string]: any;
    };
  };
}

export type SharedElementsComponentConfig = (
  route: SharedElementCompatRoute,
  otherRoute: SharedElementCompatRoute,
  showing: boolean
) => SharedElementsConfig | undefined;

export type SharedElementSceneComponent<P = object> = React.ComponentType<P> & {
  sharedElements?: SharedElementsComponentConfig;
};
