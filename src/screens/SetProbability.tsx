import React from 'react';
import {Text, SafeAreaView, Button} from 'react-native';
import {StackActions} from '@react-navigation/native';

function SetProbability({navigation}: {navigation: any}): JSX.Element {
  return (
    <SafeAreaView>
      <Text>This is SetProbability</Text>
      <Button
        title="POP"
        onPress={() => navigation.dispatch(StackActions.pop(1))}
      />
    </SafeAreaView>
  );
}

export default SetProbability;
