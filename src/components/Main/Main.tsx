import { connect } from "react-redux";
import { IState } from "../../redux/appState";
import { IProps, MainView } from "./MainView";


const mapStateToProps = (state: IState): IProps => ({
    isLoading: state.main.isLoading,
});

export const Main = connect(mapStateToProps)(MainView);
