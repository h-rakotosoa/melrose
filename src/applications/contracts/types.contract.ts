import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export interface RouteMeta {
  title: string;
  icon?: string;
  requiresAuth: boolean;
  showInMenu: boolean;
  order: number;
}

export type RouteObjectWithMeta = RouteObject & {
  meta?: RouteMeta;
  children?: RouteObjectWithMeta[];
};

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => ReactNode;
  className?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}
