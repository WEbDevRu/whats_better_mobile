import React from 'react';
import {View, StyleSheet,} from 'react-native';
import {Comparisons} from '../../components/Comparisons';

const MainPage = () => {
  return (
    <View style={styles.container}>
      <Comparisons />
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
