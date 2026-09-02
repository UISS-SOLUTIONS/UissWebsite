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
  clubId: number | null;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string | null;
  location: string | null;
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
  title: string | null;
  description: string | null;
  introVidId: string | null;
}
