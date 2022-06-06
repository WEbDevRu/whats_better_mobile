import React, {ReactElement} from 'react';
import {ApolloProvider} from '@apollo/client';
import apolloClient from '../../config/apolloClient';
import { ComparisonProvider } from '../../context/ComparisonContext';

interface PropsAppContextProvider {
  children: ReactElement;
}

const AppContextProvider: React.FC<PropsAppContextProvider> = ({children}) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ComparisonProvider>
        {children}
      </ComparisonProvider>
    </ApolloProvider>
  );
};

export default React.memo(AppContextProvider);
