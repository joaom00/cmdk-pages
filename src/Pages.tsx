import React from "react";

type PageContextValue = {
  pages: string[];
  currentPage: string;
  onNextPage: (page: string) => void;
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
  const currentPage = pages[pages.length - 1];

  const handleNextPage = React.useCallback((page: string) => {
    return setPages((currentPages) => [...currentPages, page]);
  }, []);

  const handlePreviousPage = React.useCallback(() => {
    if (currentPage !== "root") {
      setPages((currentPages) => currentPages.slice(0, -1));
    }
  }, [currentPage]);

  const handlePageChange = React.useCallback((page: string) => {
    setPages((pages) => {
      const newPages = [...pages];
      newPages.splice(pages.indexOf(page) + 1, pages.length);
      return newPages;
    });
  }, []);

  const value = React.useMemo(
    () => ({
      pages,
      currentPage,
      onNextPage: handleNextPage,
      onPreviousPage: handlePreviousPage,
      onPageChange: handlePageChange,
    }),
    [pages, currentPage, handleNextPage, handlePreviousPage, handlePageChange]
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePages = () => {
  const context = React.useContext(PageContext);
  if (!context) {
    throw new Error("usePages must be used within PagesProvider");
  }
  return context;
};
