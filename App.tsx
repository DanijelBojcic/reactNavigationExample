import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createStackNavigator<any>();

const BuggyImage = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Text>Loading</Text>}
      <Image
        style={style.image}
        onLoad={() => setLoaded(true)}
        onLoadStart={() => setLoaded(false)} // replacing this line with: 'onError={()=>setLoaded(false)}' will fix the bug
        source={{
          uri: 'imageurl',
        }}
      />
    </>
  );
};

const Profile = (props: StackScreenProps<any>) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Settings')}
      style={style.profile}>
      <BuggyImage />
    </TouchableOpacity>
  );
};
const Settings = () => {
  return <View style={style.settings} />;
};

const App = () => {
  return (
    <GestureHandlerRootView style={style.flex}>
      <SafeAreaView style={style.flex}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              gestureEnabled: true,
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const style = StyleSheet.create({
  flex: {
    flex: 1,
  },
  settings: {
    flex: 1,
    backgroundColor: 'blue',
  },
  profile: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
});

export default App;
