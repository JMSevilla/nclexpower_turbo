export type MenuButtonType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    label: string,
    icon?: React.ReactNode,
    isActive?: boolean
}

export type CustomMenusType = {
    editorFor: "default" | "questions" | "casestudy"
}