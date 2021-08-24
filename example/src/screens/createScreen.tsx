import * as React from "react";

export function createScreen(
  Component: React.ComponentType<any>,
  title?: string,
  sharedElements?: any,
  overriddenProps?: any,
  render?: (props: any) => any
) {
  const WrappedComponent = (props: any) => {
    const allProps = {
      ...props,
      ...(overriddenProps ?? {}),
    };
    return render?.(allProps) ?? <Component {...allProps} />;
  };
  // @ts-ignore
  const { navigationOptions } = Component;
  WrappedComponent.navigationOptions = title
    ? {
        title,
      }
    : navigationOptions;
  // @ts-ignore
  WrappedComponent.sharedElements = sharedElements || Component.sharedElements;
  WrappedComponent.displayName = Component.displayName || Component.name;
  return WrappedComponent;
}
