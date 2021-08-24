import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
// @ts-ignore
import RawTouchableScale from "react-native-touchable-scale";

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  children: any;
};

export function TouchableScale(props: Props) {
  return (
    <RawTouchableScale
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      {...props}
    />
  );
}
