import { NavigationItem } from "amis-ui/lib/components/menu"

export type NavItem = NavigationItem & {
    id?: string
    schema?: any
}