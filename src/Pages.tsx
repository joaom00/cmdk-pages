import React from "react";

type PageContextValue = {
  pages: string[];
  currentPage: string;
  onPagesChange: (page: string) => void;
  onPreviousPage: () => void;
  onPageChange: (page: string) => void;
};

const PageContext = React.createContext<PageContextValue | undefined>(
  undefined
);

type ProviderProps = {
  children: React.ReactNode;
};

export const Pages = ({ children }: ProviderProps) => {
  const [pages, setPages] = React.useState<string[]>(["root"]);

  const handlePageChange = (page: string) => {
    return setPages([...pages, page]);
  };

  const handlePreviousPage = () => {
    setPages((pages) => pages.slice(0, -1));
  };

  const handleGoToPage = (page: string) => {
    setPages((pages) => {
      const newPages = [...pages];
      newPages.splice(pages.indexOf(page) + 1, pages.length);
      return newPages;
    });
  };

  return (
    <PageContext.Provider
      value={{
        pages,
        currentPage: pages[pages.length - 1],
        onPagesChange: handlePageChange,
        onPreviousPage: handlePreviousPage,
        onPageChange: handleGoToPage,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePages = () => {
  const context = React.useContext(PageContext);
  if (!context) {
    throw new Error("usePages must be used within PagesProvider");
  }
  return context;
};
