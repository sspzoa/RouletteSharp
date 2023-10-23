import React from 'react';
import {Text, SafeAreaView, Button} from 'react-native';
import {StackActions} from '@react-navigation/native';

function Settings({navigation}: {navigation: any}): JSX.Element {
  return (
    <SafeAreaView>
      <Text>This is Settings</Text>
      <Button
        title="POP"
        onPress={() => navigation.dispatch(StackActions.pop(1))}
      />
    </SafeAreaView>
  );
}

export default Settings;
