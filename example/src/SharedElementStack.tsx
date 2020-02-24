import * as React from 'react';
import {Dimensions, Button, View, Text} from 'react-native';
import {
  createSharedElementStackNavigator,
  SharedElement,
} from 'react-navigation-shared-element';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/core';

const {Navigator, Screen} = createSharedElementStackNavigator<
  SharedElementStackParams
>();

export default () => (
  <Navigator initialRouteName="List">
    <Screen name="List" component={ListScreen} />
    <Screen
      name="Details"
      component={DetailsScreen}
      sharedElementsConfig={() => ['title']}
    />
  </Navigator>
);

type SharedElementStackParams = {
  List: undefined;
  Details: {sharedElements?: any};
};

type Props = {
  navigation: StackNavigationProp<SharedElementStackParams>;
};

const Buttons: React.FC = () => {
  const navigation = useNavigation<
    StackNavigationProp<SharedElementStackParams>
  >();
  return (
    <React.Fragment>
      <Button
        title="Push Details"
        onPress={() =>
          navigation.push('Details', {
            sharedElements: ['title'],
          })
        }
      />
      <SharedElement id="title">
        <Text>Details Screen</Text>
      </SharedElement>
      <Button
        title="Go back to all examples"
        onPress={() => {}} //props.navigation.navigate('Home')}
      />
    </React.Fragment>
  );
};

class ListScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'List',
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <Buttons />
      </View>
    );
  }
}

class DetailsScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Details',
    gestureResponseDistance: {
      horizontal: Dimensions.get('window').width,
    },
  };

  static sharedElements = () => {
    return ['title'];
  };

  componentDidMount() {
    console.log('DetailsScreen didMount');
  }

  componentWillUnmount() {
    console.log('DetailsScreen willUnmount');
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <SharedElement id="title">
          <Text>Details Screen</Text>
        </SharedElement>
        <Button title="Go back" onPress={this._goBack} />
      </View>
    );
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };
}
