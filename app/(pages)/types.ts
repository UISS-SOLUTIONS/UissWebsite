export interface IEventCard {
  id: number;
  clubID: number;
  image: string;
  title: string;
  description: string;
  date?: string;
  venue?: string;
  addedOn: string;
}

export interface ITestmonyCard {
  id: number;
  image: string;
  name: string;
  position: string;
  description: string;
}

export interface IVisionCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ICoreValue {
  id: number;
  value: string;
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
  };
}
export interface ILeader {
  id:        number;
  firstName: string;
  lastName:  string;
  position:  string;
  year:      string;
  facebook:  string;
  linkedIn:  string;
  instagram: string;
  twitter:   string;
  imageURL: string;
}


export interface IAwardCard {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

export interface IUpdateComponent {
  id: number;
  title: string;
  image: string;
  date: string;
  description: string;
}

export interface IBenefitCard {
  id: number;
  title: string;
}

export interface IHomePage {
  id:            number;
  section:       string;
  heading:       string;
  subheading:    string;
  description:   string;
  backgroundImg: string;
}

export interface IClub {
  id:                number;
  title:             string;
  description:       string;
  introVidId:        string;
  vision:            string;
  mission:           string;
  visiondescription: string;
}

