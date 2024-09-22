import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LudoboardScreen from '../Screens/LudoboardScreen';
import HomeScreen from '../Screens/HomeScreen';
import SplashScreen from '../Screens/SplashScreen';
import { navigationRef } from '../Helpers/NavigationUtils';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef} >
        <Stack.Navigator initialRouteName='LudoboardScreen' screenOptions={{
            headerShown:false,
        }}>
            <Stack.Screen name='LudoboardScreen' options={{
                animation:'fade'
            }} component={LudoboardScreen} />
            <Stack.Screen name='HomeScreen' options={{
                animation:'fade'
            }} component={HomeScreen} />
            <Stack.Screen name='SplashScreen' options={{
                animation:'fade'
            }} component={SplashScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

