import { IUpdateComponent } from "../(pages)/types";

export interface IUpdateStore {
    updates: IUpdateComponent[];
    selectedUpdate: IUpdateComponent;
    setSelectedUpdate: (update: IUpdateComponent) => void;
}