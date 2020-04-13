import * as React from "react";

export function createScreen(
  Component: React.ComponentType<any>,
  title?: string,
  sharedElements?: any,
  overriddenProps?: any
) {
  const WrappedComponent = (props: any) => (
    <Component {...props} {...overriddenProps} />
  );
  // @ts-ignore
  const { navigationOptions } = Component;
  WrappedComponent.navigationOptions = title
    ? {
        title
      }
    : navigationOptions;
  // @ts-ignore
  WrappedComponent.sharedElements = sharedElements || Component.sharedElements;
  WrappedComponent.displayName = Component.displayName || Component.name;
  return WrappedComponent;
}
