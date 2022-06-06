import React, {createContext, ReactElement, useContext, useState} from 'react';
import {IInitComparison, IVote} from '../types/comparison';
import {
  useGetComparisonLazyQuery,
  useGetComparisonQuery,
} from './types/Context';
import {IComparisonState} from '../types/comparison';
import {ComparisonEntity} from '../../graphql/types/graphql';
import {getRandomInt} from '../utils/number/getRandomInt';

interface IContext {
  onInitComparison: (comparisonId: IInitComparison) => void;
  comparisonState: IComparisonState;
  onStartRound: () => void;
  onVote: (data: IVote) => void;
}

const ComparisonContext = createContext({} as IContext);
export const useComparison = () => useContext(ComparisonContext);

interface PropsInterface {
  children: ReactElement | ReactElement[];
}

export const ComparisonProvider = (props: PropsInterface) => {
  const {children} = props;

  const [getComparison] = useGetComparisonLazyQuery({});
  const [comparisonState, setComparisonState] = useState<IComparisonState>({
    isEnded: false,
    isRoundStart: false,
    isFetching: true,
    entities: [],
    currentRoundEntities: [],
    retiredEntities: [],
    currentComparison: [],
  });

  const handleGetPair = (
    entities: Partial<ComparisonEntity>[],
  ): Partial<ComparisonEntity>[] => {
    const initLength = entities.length;
    const firstComparisonIndex = getRandomInt(0, initLength - 1);
    const secondComparisonIndex = getRandomInt(0, initLength - 2);

    const entitiesCopy = [...entities];
    const firstEntity = entitiesCopy?.[firstComparisonIndex];
    const slicedEntitiesCopy = [...entities];
    slicedEntitiesCopy.splice(firstComparisonIndex, 1);
    const secondEntity = slicedEntitiesCopy?.[secondComparisonIndex];

    return [firstEntity, secondEntity];
  };

  const onInitComparison = async ({comparisonId}: IInitComparison) => {
    const {data} = await getComparison({
      variables: {
        getComparisonId: comparisonId,
      },
    });

    if (data) {
      setComparisonState({
        isEnded: false,
        isRoundStart: true,
        isFetching: false,
        entities: data.getComparison.comparisonEntities,
        currentRoundEntities: data.getComparison.comparisonEntities,
        retiredEntities: [],
        currentComparison: handleGetPair(data.getComparison.comparisonEntities),
      });
    }
  };

  const onVote = (data: IVote) => {
    setComparisonState(c => {
      if (c.currentRoundEntities.length === 2) {
        const retiredEntitiesCopy = [...c.retiredEntities];
        const votedEntityIndex = c.currentComparison.findIndex(
          e => e.id === data.entityId,
        );
        retiredEntitiesCopy.push(
          c.currentComparison[votedEntityIndex === 0 ? 0 : 1],
        );
        retiredEntitiesCopy.push(
          c.currentComparison[votedEntityIndex === 0 ? 1 : 0],
        );
        return {
          ...c,
          retiredEntities: retiredEntitiesCopy,
          isEnded: true,
        };
      }
      return c;
    });
  };

  const onStartRound = () => {
    setComparisonState(c => ({
      ...c,
      isRoundStart: false,
    }));
  };

  return (
    <ComparisonContext.Provider
      value={{
        onInitComparison,
        comparisonState,
        onStartRound,
        onVote,
      }}>
      {children}
    </ComparisonContext.Provider>
  );
};
