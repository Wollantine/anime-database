import { IState } from "../../redux/appState";
import { IStateProps, IActionProps, SearchFormView } from "./SearchFormView";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Maybe } from 'tsmonad';
import * as R from 'ramda';
import { EStatus } from "../../api/searchAnime";
import { updateStatus, updateScore, updateQuery } from "./redux/SearchFormActions";


const statusesWithRepetitions = ['all', ...Object.keys(EStatus)];
const statuses = statusesWithRepetitions.filter((status, index) => statusesWithRepetitions.indexOf(status) === index);

const statusValue = (status: Maybe<EStatus>): string => (
    status.map(s => EStatus[s] as string).valueOr('all')
);

const eventToMaybeStatus = (e): Maybe<EStatus> => {
    const newStatus = EStatus[EStatus[e.target.value]];
    return Maybe.maybe(newStatus);
}

const mapStateToProps = (state: IState): IStateProps => ({
    searchQuery: state.searchForm.searchQuery,
    score: state.searchForm.score,
    status: statusValue(state.searchForm.status),
    statuses,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
    onSearchChange: (query) => dispatch(updateQuery(query)),
    onScoreChange: (score) => dispatch(updateScore(score)),
    onStatusChange: R.pipe(eventToMaybeStatus, updateStatus, dispatch),
});

export const SearchForm = connect(mapStateToProps, mapDispatchToProps)(SearchFormView);
