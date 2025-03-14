/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutListImport } from './routes/_layout/list'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutListRoute = LayoutListImport.update({
  id: '/list',
  path: '/list',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/list': {
      id: '/_layout/list'
      path: '/list'
      fullPath: '/list'
      preLoaderRoute: typeof LayoutListImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutListRoute: typeof LayoutListRoute
  LayoutIndexRoute: typeof LayoutIndexRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutListRoute: LayoutListRoute,
  LayoutIndexRoute: LayoutIndexRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteWithChildren
  '/list': typeof LayoutListRoute
  '/': typeof LayoutIndexRoute
}

export interface FileRoutesByTo {
  '/list': typeof LayoutListRoute
  '/': typeof LayoutIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/_layout/list': typeof LayoutListRoute
  '/_layout/': typeof LayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/list' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/list' | '/'
  id: '__root__' | '/_layout' | '/_layout/list' | '/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/list",
        "/_layout/"
      ]
    },
    "/_layout/list": {
      "filePath": "_layout/list.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
