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

export interface IVisionCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ICoreValue {
  id: number;
  title: string;
  description: string;
}


export interface IMemberCard {
  id: number;
  image: string;
  name: string;
  position: string;
  socials: {
    instagram: string;
    linkedin: string;
    facebook?: string;
    twitter: string;
  }
}

export interface IAwardCard {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}