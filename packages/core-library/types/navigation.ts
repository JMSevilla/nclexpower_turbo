export type NavigationItemType = {
    id: number
    label: string
    path?: string
    icon?: React.ReactNode
}

export type NavigationType = NavigationItemType & {
    children?: NavigationItemType[]
}