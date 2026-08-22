import { ReactNode } from "react";

export interface ITabsHeader {
  children: ReactNode;
  title: string;
}

export interface IPosition {
  id: number;
  title: string;
}

export interface IEvents {
  id: number;
  clubID: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageURL: string;
  addedOn: Date;
}

export interface ICoreValues {
  id: number;
  value: string;
  description: string;
}

export interface IClubDetail {
  clubId: number;
  clubName: string;
  clubDescription: string;
  vision: string;
  mission: string;
  visiondescription: string;
}

export interface INewClub {
  id: number | null;
  visionMissionID: number | null;
  title: string | null;
  description: string | null;
  introVidId: string | null;
}
