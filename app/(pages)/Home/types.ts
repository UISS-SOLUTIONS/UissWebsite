export interface IEventCard {
  id: number;
  image: string;
  title: string;
  description: string;
  date?: string;
  venue?: string;
}

export interface ITestmonyCard {
  id: number;
  image: string;
  name: string;
  position: string;
  description: string;
}

export interface IProgrammeDescription {
  about: string;
  mission: string;
  vision: string;
}

export interface IProgramme {
  id: number;
  video: string;
  description: IProgrammeDescription;
}