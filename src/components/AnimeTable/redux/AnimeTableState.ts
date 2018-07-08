import { IPaginationState } from "../Pagination/redux/PaginationState";

export interface IRow {
    id: number;
    title: string;
    score: number;
    episodes: number;
    description: string;
}

export interface IAnimeTableState {
    rows: IRow[];
    order: 'asc' | 'desc';
    orderBy: keyof IRow;
    pagination: IPaginationState;
}
