import React from 'react';
import {View, StyleSheet } from 'react-native';
import {Comparisons} from '../../components/Comparisons';

const MainPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Comparisons navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 7,
  },
});

export default React.memo(MainPage);
