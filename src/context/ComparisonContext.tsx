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
      if (c.entities.length - c.retiredEntities.length === 2) {
        const retiredEntitiesCopy = [...c.retiredEntities];
        const votedEntityIndex = c.currentComparison.findIndex(
          e => e.id === data.entityId,
        );
        retiredEntitiesCopy.push(
          c.currentComparison[votedEntityIndex === 0 ? 1 : 0],
        );
        retiredEntitiesCopy.push(
          c.currentComparison[votedEntityIndex],
        );
        return {
          ...c,
          retiredEntities: retiredEntitiesCopy,
          isEnded: true,
        };
      }
      const retiredEntitiesCopy = [...c.retiredEntities];
      const votedEntityIndex = c.currentComparison.findIndex(
        e => e.id === data.entityId,
      );
      retiredEntitiesCopy.push(
        c.currentComparison[votedEntityIndex === 0 ? 1 : 0],
      );

      const votedEntity0RoundIndex = c.currentRoundEntities.findIndex(
        ce => ce.id === c.currentComparison[0].id,
      );

      const currentRoundEntities = [...c.currentRoundEntities];
      currentRoundEntities.splice(votedEntity0RoundIndex, 1);
      const votedEntity1RoundIndex = currentRoundEntities.findIndex(
        ce => ce.id === c.currentComparison[1].id,
      );
      currentRoundEntities.splice(votedEntity1RoundIndex, 1);
      let newRoundEntities = [];
      if (currentRoundEntities.length === 0) {
        const retiredIds = retiredEntitiesCopy.map(r => r.id);
        newRoundEntities = c.entities.filter(cn => !retiredIds.includes(cn.id));
        return {
          ...c,
          retiredEntities: retiredEntitiesCopy,
          currentComparison: handleGetPair(newRoundEntities),
          currentRoundEntities: newRoundEntities,
          isRoundStart: true,
        };
      }

      console.log(currentRoundEntities);

      return {
        ...c,
        retiredEntities: retiredEntitiesCopy,
        currentRoundEntities: currentRoundEntities,
        currentComparison: handleGetPair(currentRoundEntities),
      };
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
