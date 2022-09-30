import { IImageType } from './file';

export interface GardenType {
  name: string;
  image?: IImageType;
  size?: number;
  location?: string;
}

export interface GardenUpdate {
  name?: string;
  image?: string;
  size?: number;
  location?: string;
}
