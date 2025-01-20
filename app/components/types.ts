import { ReactNode } from "react";

export interface INavDropDown {
  id: number;
  name: string;
  link?: string;
  dropDown?: boolean;
  children?: INavDropDown[]
}

export interface StatCounterProps {
  id: number;
  start: number; 
  end: number; 
  duration: number; 
  label: string; 
}

export interface options{
  name: string
}
export interface SelectProps {
    id: number;
    placeholder: string;
    options: options[]
}

export interface IDialog {
  btnTitle: string;
  dialogTitle: string;
  children: ReactNode;
  className: string;
}

export interface IFormContainer{
  children: ReactNode;
}

export interface IModal {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

}