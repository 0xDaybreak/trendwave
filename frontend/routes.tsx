
import { createBrowserRouter, IndexRouteObject, NonIndexRouteObject, useMatches } from 'react-router-dom';
import { HomeView } from "Frontend/views/HomeView";
import TodaysTopView from "Frontend/views/TodaysTopView";
import {LoginView} from "Frontend/views/LoginView";
import RegisterView from "Frontend/views/RegisterView";
import FavouritesView from "Frontend/views/FavouritesView";
import FilteredView from "Frontend/views/FilteredView";
import FeedView from "Frontend/views/FeedView";

export type MenuProps = Readonly<{
  icon?: string;
  title?: string;
}>;

export type ViewMeta = Readonly<{ handle?: MenuProps }>;

type Override<T, E> = Omit<T, keyof E> & E;

export type IndexViewRouteObject = Override<IndexRouteObject, ViewMeta>;
export type NonIndexViewRouteObject = Override<
  Override<NonIndexRouteObject, ViewMeta>,
  {
    children?: ViewRouteObject[];
  }
>;
export type ViewRouteObject = IndexViewRouteObject | NonIndexViewRouteObject;

type RouteMatch = ReturnType<typeof useMatches> extends (infer T)[] ? T : never;

export type ViewRouteMatch = Readonly<Override<RouteMatch, ViewMeta>>;

export const useViewMatches = useMatches as () => readonly ViewRouteMatch[];

export const routes: readonly ViewRouteObject[] = [
    {path: '/', element: <HomeView/>},
    {path: 'top', element: <TodaysTopView/>},
    {path:'/home', element:<LoginView/>},
    {path: 'register', element: <RegisterView/>},
    {path: 'favourites', element: <FavouritesView/>},
    {path: ':category', element: <FilteredView/> }, // Path with a parameter placeholder
    {path: 'feed', element: <FeedView/>}
];


const router = createBrowserRouter([...routes]);
export default router;
