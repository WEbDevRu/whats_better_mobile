import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import {ComparisonCategory} from '../../../graphql/types/graphql';
import {useQueryComparisonCategoryLazyQuery} from './types/Comparisions';
import {ComparisonCard} from './ComparisonCard';
import {useComparison} from '../../context/ComparisonContext';


const Comparisons = ({navigation}) => {
  const [query] = useQueryComparisonCategoryLazyQuery();
  const [categories, setCategories] = useState<ComparisonCategory[]>();
  const {onInitComparison} = useComparison();

  const handleOpenComparison = (comparisonId: string) => {
    navigation.navigate('Whats better?');
    onInitComparison({comparisonId});
  };

  useEffect(() => {
    if (query) {
      const handleInit = async () => {
        const {data} = await query();
        setCategories(data?.queryComparisonCategory as ComparisonCategory[]);
      };
      handleInit();
    }
  }, [query]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
        }}>
        {categories?.map(category => (
          <View
            key={category.id}
            style={{
              width: '100%',
            }}>
            <Title style={styles.categoryTitle}>{category.title}</Title>
            {category?.comparisons?.map(comparison => (
              <ComparisonCard
                key={comparison.id}
                comparison={comparison}
                onPress={() => handleOpenComparison(comparison?.id as string)}
              />
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
