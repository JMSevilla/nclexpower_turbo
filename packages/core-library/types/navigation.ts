import { NavigationItemType } from './global'


export type NavigationType = NavigationItemType & {
    children?: NavigationItemType[]
}