export interface PlantType {
  name: string;
  description?: string;
  family?: string;
  genus?: string;
  species?: string;
  light?: string;
}

export interface CreatePlantType {
  name: string;
  careerGuide?: string;
  age?: number;
  color?: string;
  gardenId?: number;
  plantTypeId: number;
  files?: any;
}

export interface UpdatePlantType {
  name?: string;
  career_guide?: string;
  files?: any;
}
