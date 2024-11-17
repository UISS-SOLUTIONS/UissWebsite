interface IEventCard {
  id: number;
  image: string;
  title: string;
  description: string;
  date?: string;
  venue?: string;
}

interface ITestmonyCard {
  id: number;
  image: string;
  name: string;
  position: string;
  description: string;
}

interface IProgrammeDescription {
  about: string;
  mission: string;
  vision: string;
}

interface IProgramme {
  id: number;
  video: string;
  description: IProgrammeDescription;
}