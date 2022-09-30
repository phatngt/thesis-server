export interface GardenType {
  name: string;
  image?: string;
  size?: number;
  location?: string;
}

export interface GardenUpdate {
  name?: string;
  image?: string;
  size?: number;
  location?: string;
}
