import React from "react";
import { Command } from "cmdk";
import "./App.css";
import "./raycast.scss";
import { Pages, usePages } from "./Pages";
import { PageContent, usePageContent } from "./PagesContent";
import { Breadcrumb, BreadcrumbPortal, BreadcrumbProvider } from "./Breadcrumb";

function App() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  function bounce() {
    if (ref.current) {
      ref.current.style.transform = "scale(0.96)";
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = "";
        }
      }, 100);
    }
  }

  return (
    <main>
      <BreadcrumbProvider>
        <Command
          ref={ref}
          onKeyDown={(event) => {
            if (event.key === "Enter") bounce();
          }}
        >
          <Pages>
            <BreadcrumbPortal />
            <Command.Input autoFocus placeholder="What do you need?" />
            <Command.List>
              <Command.Empty>No results found.</Command.Empty>
              <Breadcrumb>Home</Breadcrumb>

              <Group heading="Projects">
                <ItemPageTrigger page="projects" shortcut="S P">
                  <ProjectsIcon />
                  Search Projects...
                </ItemPageTrigger>

                <Item>
                  <PlusIcon />
                  Create New Project...
                </Item>
              </Group>
              <Group heading="Teams">
                <Item shortcut="⇧ P">
                  <TeamsIcon />
                  Search Teams...
                </Item>
                <Item>
                  <PlusIcon />
                  Create New Team...
                </Item>
              </Group>
              <Group heading="Help">
                <Item shortcut="⇧ D">
                  <DocsIcon />
                  Search Docs...
                </Item>
                <Item>
                  <FeedbackIcon />
                  Send Feedback...
                </Item>
                <Item>
                  <ContactIcon />
                  Contact Support
                </Item>
              </Group>

              <PageContent page="projects">
                <Breadcrumb>Projects</Breadcrumb>
                <Item>Project 1</Item>
                <Item>Project 2</Item>
                <Item>Project 3</Item>
                <Item>Project 4</Item>
                <Item>Project 5</Item>
                <Item>Project 6</Item>
              </PageContent>
            </Command.List>
          </Pages>
        </Command>
      </BreadcrumbProvider>
    </main>
  );
}

type ItemProps = React.ComponentPropsWithRef<typeof Command.Item> & {
  shortcut?: string;
  isCommand?: boolean;
};
function Item({ children, shortcut, isCommand = false, ...props }: ItemProps) {
  const context = usePages();
  const page = usePageContent();
  const currentPageIndex = context.pages.indexOf(context.currentPage);
  const pageIndex = context.pages.indexOf(page);
  const shouldShow = currentPageIndex === pageIndex;
  return shouldShow ? (
    <Command.Item {...props}>
      {children}
      {shortcut && (
        <div cmdk-vercel-shortcuts="">
          {shortcut.split(" ").map((key) => {
            return <kbd key={key}>{key}</kbd>;
          })}
        </div>
      )}
    </Command.Item>
  ) : null;
}

type GroupProps = React.ComponentPropsWithRef<typeof Command.Group> & {};
function Group({ children, ...props }: GroupProps) {
  const context = usePages();
  const page = usePageContent();
  const currentPageIndex = context.pages.indexOf(context.currentPage);
  const pageIndex = context.pages.indexOf(page);
  const shouldShow = currentPageIndex === pageIndex;
  return shouldShow ? (
    <Command.Group {...props}>{children}</Command.Group>
  ) : null;
}

type PageTriggerProps = ItemProps & {
  page: string;
};
const ItemPageTrigger = ({ page, ...props }: PageTriggerProps) => {
  const context = usePages();
  return (
    <Item
      {...props}
      onSelect={(value) => {
        props.onSelect?.(value);
        context.onPagesChange(page);
      }}
    />
  );
};

function ProjectsIcon() {
  return (
    <svg
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M3 3h7v7H3z"></path>
      <path d="M14 3h7v7h-7z"></path>
      <path d="M14 14h7v7h-7z"></path>
      <path d="M3 14h7v7H3z"></path>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M12 5v14"></path>
      <path d="M5 12h14"></path>
    </svg>
  );
}

function TeamsIcon() {
  return (
    <svg
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
      <path d="M16 3.13a4 4 0 010 7.75"></path>
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path>
    </svg>
  );
}

function DocsIcon() {
  return (
    <svg
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
      <path d="M14 2v6h6"></path>
      <path d="M16 13H8"></path>
      <path d="M16 17H8"></path>
      <path d="M10 9H8"></path>
    </svg>
  );
}

function FeedbackIcon() {
  return (
    <svg
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <path d="M22 6l-10 7L2 6"></path>
    </svg>
  );
}

export default App;
