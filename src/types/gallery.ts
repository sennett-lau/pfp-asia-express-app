export interface IGalleryFilter {
  title: string
  icon: string
  list: { label: string; numDisplay: string }[]
}

export interface INFTData {
  imageUrl: string
  project: string
  name: string
}
