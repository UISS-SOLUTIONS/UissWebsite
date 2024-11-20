export interface INavDropDown {
  id: number;
  name: string;
  dropDown?: boolean;
  children?: INavDropDown[]
}
