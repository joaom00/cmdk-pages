import React from "react";
import { Command } from "cmdk";
import { Pages, usePages } from "./Pages";
import { PageContent, usePageContent } from "./PagesContent";
import { Breadcrumb, Breadcrumbs, BreadcrumbProvider } from "./Breadcrumb";
import "./App.css";
import "./vercel.scss";

function App() {
  return (
    <main>
      <BreadcrumbProvider>
        <Pages>
          <CommandMenu>
            <Breadcrumbs />
            <CommandInput autoFocus placeholder="What do you need?" />
            <Command.List>
              <Command.Empty>No results found.</Command.Empty>
              <Breadcrumb>Home</Breadcrumb>

              <Group heading="Projects">
                <PageItemTrigger page="projects" shortcut="S P">
                  <ProjectsIcon />
                  Search Projects...
                </PageItemTrigger>

                <Item>
                  <PlusIcon />
                  Create New Project...
                </Item>
              </Group>

              <Group heading="Teams">
                <PageItemTrigger page="teams" shortcut="⇧ P">
                  <TeamsIcon />
                  Search Teams...
                </PageItemTrigger>
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
                <PageItemTrigger page="inner-projects">
                  Nested page...
                </PageItemTrigger>
                <Item>Project 1</Item>
                <Item>Project 2</Item>
                <Item>Project 3</Item>
                <Item>Project 4</Item>
                <Item>Project 5</Item>
                <Item>Project 6</Item>
              </PageContent>

              <PageContent page="inner-projects">
                <Breadcrumb>Inner Projects</Breadcrumb>
                <Item>Inner Project 1</Item>
                <Item>Inner Project 2</Item>
                <Item>Inner Project 3</Item>
                <Item>Inner Project 4</Item>
                <Item>Inner Project 5</Item>
                <Item>Inner Project 6</Item>
              </PageContent>

              <PageContent page="teams">
                <Breadcrumb>Teams</Breadcrumb>
                <Item>Team 1</Item>
                <Item>Team 2</Item>
                <Item>Team 3</Item>
                <Item>Team 4</Item>
                <Item>Team 5</Item>
                <Item>Team 6</Item>
              </PageContent>
            </Command.List>
          </CommandMenu>
        </Pages>
      </BreadcrumbProvider>
    </main>
  );
}

interface CommandInputProps
  extends React.ComponentPropsWithoutRef<typeof Command.Input> {}
const CommandInput = (props: CommandInputProps) => {
  const pagesContext = usePages();
  return (
    <Command.Input
      {...props}
      onKeyDown={(event) => {
        if (
          pagesContext.currentPage !== "root" &&
          !!event.currentTarget.value
        ) {
          event.stopPropagation();
        }
      }}
    />
  );
};

interface CommandProps extends React.ComponentPropsWithoutRef<typeof Command> {}
const CommandMenu = (props: CommandProps) => {
  const pagesContext = usePages();
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
    <Command
      {...props}
      ref={ref}
      onKeyDown={(event) => {
        if (event.key === "Enter") bounce();

        if (pagesContext.currentPage === "root") return;

        if (event.key === "Backspace") {
          event.preventDefault();
          pagesContext.onPreviousPage();
          bounce();
        }
      }}
    />
  );
};

type ItemElement = React.ElementRef<typeof Command.Item>;
interface ItemProps
  extends React.ComponentPropsWithoutRef<typeof Command.Item> {
  shortcut?: string;
}
const Item = React.forwardRef<ItemElement, ItemProps>((props, forwardedRef) => {
  const { children, shortcut, ...itemProps } = props;
  const context = usePages();
  const page = usePageContent();
  const shouldShow = context.currentPage === page;
  return shouldShow ? (
    <Command.Item {...itemProps} ref={forwardedRef}>
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
});

type GroupElement = React.ComponentRef<typeof Command.Group>;
interface GroupProps
  extends React.ComponentPropsWithoutRef<typeof Command.Group> {}
const Group = React.forwardRef<GroupElement, GroupProps>(
  (props, forwardedRef) => {
    const context = usePages();
    const page = usePageContent();
    const shouldShow = context.currentPage === page;
    return shouldShow ? <Command.Group {...props} ref={forwardedRef} /> : null;
  }
);

type PageItemTriggerELement = React.ElementRef<typeof Item>;
interface PageItemTriggerProps extends ItemProps {
  page: string;
}
const PageItemTrigger = React.forwardRef<
  PageItemTriggerELement,
  PageItemTriggerProps
>((props, forwardedRef) => {
  const { page, ...itemProps } = props;
  const context = usePages();
  return (
    <Item
      {...itemProps}
      ref={forwardedRef}
      onSelect={(value) => {
        props.onSelect?.(value);
        context.onNextPage(page);
      }}
    />
  );
});

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
