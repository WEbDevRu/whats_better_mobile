import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Title, Headline, Button} from 'react-native-paper';
import {ComparisonCategory} from '../../../graphql/types/graphql';
import {useQueryComparisonCategoryLazyQuery} from './types/Comparisions';
import {ComparisonCard} from './ComparisonCard';

const Comparisons = () => {
  const [query, {data}] = useQueryComparisonCategoryLazyQuery();
  const [categories, setCategories] = useState<ComparisonCategory[]>();

  useEffect(() => {
    setCategories(data?.queryComparisonCategory as ComparisonCategory[]);
  }, [data]);

  useEffect(() => {
    query();
  }, [query]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <Button onPress={query}>Fetch</Button>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
        }}>
        <Headline>Categories:</Headline>
        {categories?.map(category => (
          <View
            key={category.id}
            style={{
              width: '100%',
            }}>
            <Title style={styles.categoryTitle}>{category.title}</Title>
            {category?.comparisons?.map(comparison => (
              <ComparisonCard comparison={comparison} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    marginTop: 15,
  },
});

export default React.memo(Comparisons);
