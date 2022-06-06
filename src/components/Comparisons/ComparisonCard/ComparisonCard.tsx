import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {Comparison} from '../../../../graphql/types/graphql';

interface IProps {
  comparison: Partial<Comparison>;
  onPress: () => void;
}

const ComparisonCard = ({comparison, onPress}: IProps) => {
  return (
    <Card style={styles.container} onPress={onPress}>
      <Card.Content>
        <Title>{comparison.title}</Title>
        <Paragraph>{comparison.description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%',
  },
});

export default React.memo(ComparisonCard);
