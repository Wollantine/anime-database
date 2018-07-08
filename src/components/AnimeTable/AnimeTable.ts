import { IState } from "../../redux/appState";
import { IStateProps, AnimeTableView } from "./AnimeTableView";
import { connect } from "react-redux";
import * as R from 'ramda';
import { IRow } from "./redux/AnimeTableState";

const sortRowsByColumn = (columnId: keyof IRow, order: 'asc' | 'desc'): ((rows: IRow[]) => IRow[]) => {
    const reverseIfNeeded = columnId === 'title'
        ? order === 'asc' ? R.reverse : R.identity
        : order === 'asc' ? R.identity : R.reverse;
    const sortingFunction = R.sortBy(R.prop(columnId));
    return R.pipe(sortingFunction, reverseIfNeeded);
}

const getRowsByPage = R.curry((page: number, pageSize: number, rows: IRow[]): IRow[] => (
    rows.slice(page * pageSize, (page + 1) * pageSize)
));

const mapStateToProps = (state: IState): IStateProps => {
    const {orderBy, order, rows} = state.animeTable;
    const {page, pageSize} = state.animeTable.pagination;
    const getRows = R.pipe(
        sortRowsByColumn(orderBy, order),
        getRowsByPage(page, pageSize),
    );
    return {
        rows: getRows(rows),
    };
};

export const AnimeTable = connect(mapStateToProps)(AnimeTableView);
