export interface IRow {
    id: number;
    title: string;
    score: number;
    episodes: number;
    description: string;
}

export interface IAnimeTableState {
    rows: IRow[];
}
