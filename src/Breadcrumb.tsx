import React from "react";
import ReactDOM from "react-dom";
import { usePages } from "./Pages";
import { usePageContent } from "./PagesContent";

type BreadcrumbElement = HTMLOListElement;
type ContextValue = [
  BreadcrumbElement | null,
  (element: BreadcrumbElement | null) => void
];

const Context = React.createContext<ContextValue | undefined>(undefined);

const useBreadcrumbContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("Missing BreadcrumbProvider.");
  }

  return context;
};

type BreadcrumbProviderProps = {
  children: React.ReactNode;
};
const BreadcrumbProvider = ({ children }: BreadcrumbProviderProps) => {
  const portalNodeState = React.useState<HTMLOListElement | null>(null);
  return (
    <Context.Provider value={portalNodeState}>{children}</Context.Provider>
  );
};

const Breadcrumbs = () => {
  const [, setPortalNode] = useBreadcrumbContext();
  return (
    <nav aria-label="Breadcrumb">
      <ol ref={setPortalNode} />
    </nav>
  );
};

type BreadcrumbProps = {
  children: React.ReactNode;
};
const Breadcrumb = ({ children, ...props }: BreadcrumbProps) => {
  const [portalNode] = useBreadcrumbContext();
  const pageContext = usePages();
  const page = usePageContent();
  return pageContext.pages.includes(page) && portalNode
    ? ReactDOM.createPortal(
        <li style={{ all: "unset" }}>
          <button
            cmdk-vercel-badge=""
            {...props}
            onClick={() => pageContext.onPageChange(page)}
          >
            {children}
          </button>
        </li>,
        portalNode
      )
    : null;
};

export { BreadcrumbProvider, Breadcrumbs, Breadcrumb };
