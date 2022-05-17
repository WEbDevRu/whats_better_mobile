import React, {ReactElement} from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../config/apolloClient';

interface PropsAppContextProvider {
  children: ReactElement;
}

const AppContextProvider: React.FC<PropsAppContextProvider> = ({children}) => {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
};

export default React.memo(AppContextProvider);
