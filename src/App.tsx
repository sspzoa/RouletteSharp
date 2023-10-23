import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from './screens/Main';
import ClassSelection from './screens/ClassSelection';
import SetProbability from './screens/SetProbability';
import Settings from './screens/Settings';

type RootStackParamList = {
  Main: {productId: string};
  ClassSelection: {productId: string};
  SetProbability: {productId: string};
  Settings: {productId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Main'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="ClassSelection" component={ClassSelection} />
        <Stack.Screen name="SetProbability" component={SetProbability} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
