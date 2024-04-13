import React, { createContext, useContext, useCallback, useEffect, useState, ReactNode } from 'react';

export interface Secret {
  domain: string;
  value: string;
}

export interface SecretsData {
  secrets: Secret[];
  addSecret: (newSecret: Secret) => void;
  // You can also include functions to remove or update secrets as needed.
}

const SecretsContext = createContext<SecretsData | undefined>(undefined);

export const SecretsProvider = ({ children }: { children: ReactNode }) => {
  const [secrets, setSecrets] = useState<Secret[]>([]);

  // Function to add a new secret to the secrets array
  const addSecret = useCallback((newSecret: Secret) => {
    setSecrets(currentSecrets => [...currentSecrets, newSecret]);
  }, []);

  return <SecretsContext.Provider value={{ secrets, addSecret }}>{children}</SecretsContext.Provider>;
};

export function useSecrets() {
  const context = useContext(SecretsContext);
  if (context === undefined) {
    throw new Error('useSecrets must be used within a SecretsProvider');
  }
  return context;
}
