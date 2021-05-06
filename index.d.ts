declare module '*.png'

declare interface IPost {
  id: number
  user_id: number
  category_id: number
  post_date: string
  image_url: string
  description: string
}
