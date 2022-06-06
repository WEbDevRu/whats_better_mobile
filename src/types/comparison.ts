import { ComparisonEntity } from '../../graphql/types/graphql';

export interface IInitComparison {
    comparisonId: string
}

export interface IComparisonState {
    isEnded: boolean,
    isRoundStart: boolean,
    isFetching: boolean,
    entities: Partial<ComparisonEntity>[],
    currentRoundEntities: Partial<ComparisonEntity>[],
    retiredEntities: Partial<ComparisonEntity>[],
    currentComparison: Partial<ComparisonEntity>[],
}

export interface IVote {
    entityId: string,
}
