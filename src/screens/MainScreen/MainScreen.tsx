import React from 'react';
import {View} from 'react-native';
import {Comparisons} from '../../components/Comparisons';

const MainPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Comparisons navigation={navigation} />
    </View>
  );
};

export default React.memo(MainPage);
