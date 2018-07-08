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

const mapStateToProps = (state: IState): IStateProps => ({
    rows: sortRowsByColumn(state.animeTable.orderBy, state.animeTable.order)(state.animeTable.rows),
});

export const AnimeTable = connect(mapStateToProps)(AnimeTableView);
