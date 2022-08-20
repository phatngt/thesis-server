export interface GardenRoomType {
  name: string
  image?: string
  size?: number
  location?: string
  parent_room_id?: number
}

export interface GardenRoomUpdate {
  name?: string
  image?: string
  size?: number
  location?: string
  parent_room_id?: number
}
