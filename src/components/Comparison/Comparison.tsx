import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Subheading, Button} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useTranslation} from "react-i18next";
import {ComparisonEntity} from '../../../graphql/types/graphql';
import {IVote} from '../../types/comparison';

interface IProps {
  currentComparison: Partial<ComparisonEntity>[];
  onVote: (data: IVote) => void;
}

const Comparison = ({currentComparison, onVote}: IProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Subheading style={styles.entityName}>
        {currentComparison?.[0].title}
      </Subheading>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={currentComparison?.[0]?.link?.split('=')[1]}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => onVote({entityId: currentComparison?.[0].id as string})}>
        Select
      </Button>
      <Subheading style={styles.entityName}>
        {currentComparison?.[1].title}
      </Subheading>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={currentComparison?.[1]?.link?.split('=')[1]}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => onVote({entityId: currentComparison?.[1].id as string})}>
          {t('select')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 7,
  },
  entityName: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: -80,
    marginBottom: 30,
  },
});

export default React.memo(Comparison);
