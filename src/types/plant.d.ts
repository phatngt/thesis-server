import { ImageType } from "./file"

export interface PlantType {
  name: string
  description?: string
  family?: string
  genus?: string
  species?: string
  light?: string

}

export interface Plant {
  name: string
  career_guide?: string
  age?: number
  color?: string
  garden_room_id?: number
  plant_type_id: number
  files?: any
}
