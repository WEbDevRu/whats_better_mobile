import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {useComparison} from '../../context/ComparisonContext';
import {Comparison} from '../../components/Comparison';

const ComparisonScreen = () => {
  const {comparisonState, onStartRound, onVote} = useComparison();

  useEffect(() => {
    let timeout: any;
    if (comparisonState.isRoundStart) {
      timeout = setTimeout(() => {
        onStartRound();
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [comparisonState.isRoundStart]);

  if (comparisonState.isFetching) {
    return <ActivityIndicator />;
  }

  if (comparisonState.isEnded) {
    return (
      <View style={styles.endedCont}>
        <Title style={styles.startTitle}>Your result:</Title>
      </View>
    );
  }

  if (comparisonState.isRoundStart) {
    return (
      <View style={styles.startCont}>
        <Title style={styles.startTitle}>Start new round</Title>
        <Text>
          Select from {comparisonState.currentRoundEntities.length} entities
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!comparisonState.isFetching && (
        <Comparison
          onVote={onVote}
          currentComparison={comparisonState.currentComparison}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 7,
  },
  endedCont: {
    width: '100%',
    padding: 7,
    paddingTop: 20,
  },
  startTitle: {
    fontSize: 30,
  },
  startCont: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(ComparisonScreen);
