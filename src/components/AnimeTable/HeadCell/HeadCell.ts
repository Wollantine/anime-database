import { IState } from "../../../redux/appState";
import { IStateProps, HeadCellView, IProps, IActionProps } from "./HeadCellView";
import { Dispatch } from "redux";
import { updateTableSorting } from "../redux/AnimeTableActions";
import { connect } from "react-redux";

const mapStateToProps = (state: IState): IStateProps => ({
    order: state.animeTable.order,
    orderBy: state.animeTable.orderBy,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
    updateTableSorting: (columnId, orderBy) => dispatch(updateTableSorting(columnId, orderBy === columnId)),
});

export const HeadCell = connect(mapStateToProps, mapDispatchToProps)(HeadCellView);
