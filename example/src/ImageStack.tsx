import * as React from 'react';
import {Dimensions, Button, Image, View} from 'react-native';
import {
  createSharedElementStackNavigator,
  SharedElement,
  SharedElementsComponentConfig,
} from 'react-navigation-shared-element';
import {FlatList, BorderlessButton} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';

type ImageStackParams = {
  List: undefined;
  Details: {
    id: number;
    src: string;
  };
};

type Props = {
  navigation: StackNavigationProp<ImageStackParams>;
};

const {Navigator, Screen} = createSharedElementStackNavigator<
  ImageStackParams
>();

export default () => (
  <Navigator
    initialRouteName="List"
    screenOptions={{
      transitionSpec: {
        open: {
          animation: 'timing',
          config: {
            duration: 350,
          },
        },
        close: {
          animation: 'timing',
          config: {
            duration: 350,
          },
        },
      },
    }}>
    <Screen
      name="List"
      component={ListScreen}
      options={{title: 'Image list', headerBackTitle: 'Back'}}
    />
    <Screen
      name="Details"
      component={DetailsScreen}
      options={{title: 'Random image from Unsplash'}}
    />
  </Navigator>
);

class ListScreen extends React.Component<
  Props & {route: RouteProp<ImageStackParams, 'List'>}
> {
  // static navigationOptions = ({navigation}) => ({
  //   title: 'Image list',
  //   headerBackTitle: 'Back',
  //   headerLeft: () => (
  //     <Button title="Back" onPress={() => navigation.navigate('Home')} />
  //   ),
  // });

  componentDidMount() {
    this.fetchRandomSources();
  }

  state = {
    items: [] as {id: number; src: string}[],
  };

  fetchRandomSources = async () => {
    const originalSources = Array.apply(null, Array(60)).map((v, i) => {
      return `https://source.unsplash.com/random/400x${400 + i}`;
    });

    const responses = await Promise.all(
      originalSources.map(async source => await fetch(source)),
    );

    // Follow the redirects to retrieve final URLs
    const items = responses.map((response, i) => ({id: i, src: response.url}));

    this.setState({items});
  };

  render() {
    return (
      <FlatList
        data={this.state.items}
        renderItem={({item}) => (
          <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
            <BorderlessButton
              onPress={() =>
                this.props.navigation.navigate('Details', {
                  id: item.id,
                  src: item.src,
                })
              }>
              <SharedElement id={'image' + item.id}>
                <Image style={{height: 100}} source={{uri: item.src}} />
              </SharedElement>
            </BorderlessButton>
          </View>
        )}
        numColumns={3}
        // keyExtractor={(item, index) => index}
        style={{flex: 1, backgroundColor: '#fff'}}
      />
    );
  }
}

class DetailsScreen extends React.Component<
  Props & {route: RouteProp<ImageStackParams, 'Details'>}
> {
  static sharedElements: SharedElementsComponentConfig = route => {
    return [{id: 'image' + route?.params?.id, animation: 'move'}];
  };

  render() {
    let id = this.props.route.params.id ?? 0;
    let src = this.props.route.params.src ?? '';

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <SharedElement id={'image' + id}>
          <Image
            source={{
              uri: src,
            }}
            style={{width: Dimensions.get('window').width, height: 400}}
            resizeMode="cover"
          />
        </SharedElement>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
