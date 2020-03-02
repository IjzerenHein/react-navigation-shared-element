import * as React from 'react';
import { Dimensions, Button, View, Text } from 'react-native';
import { withNavigation, SharedElement } from '@react-navigation/core';
import { createStackNavigator } from 'react-navigation-stack';

const Buttons = withNavigation(props => (
  <React.Fragment>
    <Button
      title="Push Details"
      onPress={() =>
        props.navigation.push('Details', {
          sharedElements: ['image'],
        })
      }
    />

    <Button
      title="Go back to all examples"
      onPress={() => props.navigation.navigate('Home')}
    />
  </React.Fragment>
));

class ListScreen extends React.Component {
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
        }}
      >
        <SharedElement id2="title">
          <Text>List Screen</Text>
        </SharedElement>
        <Buttons />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
    gestureResponseDistance: {
      horizontal: Dimensions.get('window').width,
    },
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
        }}
      >
        <SharedElement id2="title">
          <Text>Details Screen</Text>
        </SharedElement>
        <Button title="Go back" onPress={this._goBack} />
        <Buttons />
      </View>
    );
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };
}

export default createStackNavigator(
  {
    List: ListScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'List',
  }
);
