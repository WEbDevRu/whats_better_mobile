import React from 'react';
import {View, StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const ComparisonScreen = () => {
  return (
    <View style={styles.container}>
      <YoutubePlayer height={300} play={true} videoId={'kH_w5ks9GB4'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 7,
  },
});

export default React.memo(ComparisonScreen);
