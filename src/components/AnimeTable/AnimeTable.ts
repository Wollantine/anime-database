import { IState } from "../../redux/appState";
import { IStateProps, AnimeTableView } from "./AnimeTableView";
import { connect } from "react-redux";

const mapStateToProps = (state: IState): IStateProps => ({
    rows: state.animeTable.rows,
});

export const AnimeTable = connect(mapStateToProps)(AnimeTableView);
