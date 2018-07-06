import { EStatus } from "../../api/searchAnime";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

interface IStateProps {
    searchQuery: string;
    status: EStatus;
    score: number;
}

interface IActionProps {
    onSearchChange: (text: string) => void;
    onStatusChange: (status: EStatus) => void;
    onScoreChange: (score: number) => void;
}

const statusesWithRepetitions = Object.keys(EStatus);
const statuses = statusesWithRepetitions.filter((status, index) => statusesWithRepetitions.indexOf(status) === index);

export const SearchForm: React.StatelessComponent<IStateProps & IActionProps> = (
    {searchQuery, status, score, onSearchChange, onStatusChange, onScoreChange}
) => (
    <div>
        <TextField
            label="Search text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
        />
        <TextField
            label="Status"
            select
            value={status}
            onChange={(e) => onStatusChange(EStatus[e.target.value])}
        >
            {statuses.map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
        </TextField>
        //TODO Slider
    </div>
)