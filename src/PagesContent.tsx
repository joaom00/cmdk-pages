import React from "react";

const PagesContentContext = React.createContext<string>("root");

type PageProviderProps = {
  page: string;
  children: React.ReactNode;
};

export const PageContent = ({ page, children }: PageProviderProps) => {
  return (
    <PagesContentContext.Provider value={page}>
      {children}
    </PagesContentContext.Provider>
  );
};

export const usePageContent = () => {
  return React.useContext(PagesContentContext);
};
