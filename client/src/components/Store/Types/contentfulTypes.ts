export interface ContentfulItem {
  id: string
  type: string
}

export interface File extends ContentfulItem {
  id: string
  title: string
  file: {
    contentType: string
    details: {
      size: number
      image?: {
        width: number
        height: number
      }
    }
    fileName: string
    url: string
  }
}

export type RichTextNode = {
  props: {
    children: (string | any)[]
  }
}
