export interface IREDTSection {
  tab: string
  title: string
  contents: IREDTSectionContent[]
}

export interface IREDTSectionContent {
  label: string
  text: string
  url?: string
  isUrl?: boolean
}
