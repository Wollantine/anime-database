import { IState } from "../../../redux/appState";
import { IStateProps, IActionProps, PaginationView } from "./PaginationView";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { changePage } from "./redux/PaginationActions";

const mapStateToProps = (state: IState): IStateProps => ({
    count: state.animeTable.rows.length,
    page: state.animeTable.pagination.page,
    pageSize: state.animeTable.pagination.pageSize,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
    onChangePage: (page) => dispatch(changePage(page)),
});

export const Pagination = connect(mapStateToProps, mapDispatchToProps)(PaginationView);
