export const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || process.env.API_DOMAIN || 'http://localhost:8000';

export const COLORS = [
    '#51CF66', '#CC5DE8', '#FF8787', '#5C940D', '#AE3EC9', '#1098AD', '#4263EB',
    '#20C997', '#37B24D', '#D6336C', '#1C7ED6', '#7048E8', '#37B24D', '#0CA678',
    '#C92A2A', '#364FC7', '#862E9C', '#2B8A3E', '#A61E4D', '#0B7285', '#1864AB',
    '#20C997', '#37B24D', '#D6336C', '#1C7ED6', '#7048E8', '#37B24D', '#0CA678',
    '#5F3DC4', '#087F5B', '#F03E3E', '#FF8787', '#FF6B6B', '#1C7ED6', '#7048E8',
]
export const COLORS_FORECAST = [
    "#FCC419", "#FAB005", "#F08C00", "#E67700", "#FFC078", "#FFA94D", "#FF922B",
    "#FD7E14", "#F76707", "#E8590C", "#D9480F", "#FD7E14", "#F59F00", "#FCC419",
    "#F59F00", "#F08C00", "#E67700", "#FAB005", "#FFE066", "#FFA94D", "#F76707",
    "#E8590C", "#D9480F", "#FFE066", "#FCC419", "#FAB005", "#F08C00", "#E67700",
    "#FFC078", "#FFA94D", "#FF922B", "#FD7E14", "#F76707", "#E8590C", "#D9480F",
]

export const SEGMENT_VALUES = [
    {label: 'all Days', value: 'all'},
    {label: '90 Days', value: '90'},
    {label: '180 Days', value: '180'},
]