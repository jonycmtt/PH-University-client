import { ReactNode } from "react";

export type TUserRoute = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserRoute[];
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};
