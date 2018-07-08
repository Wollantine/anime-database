import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';

export interface IStateProps {
    searchQuery: string;
    status: string;
    score: number;
    statuses: string[];
}

export interface IActionProps {
    onSearchChange: (text: string) => void;
    onStatusChange: (status: React.ChangeEvent) => void;
    onScoreChange: (score: number) => void;
}

export const SearchFormView: React.StatelessComponent<IStateProps & IActionProps> = (
    {searchQuery, status, score, statuses, onSearchChange, onStatusChange, onScoreChange}
) => (
    <Grid container direction="column" spacing={16} justify="center" alignItems="flex-start">
        <Grid item>
            <TextField
                label="Search text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </Grid>
        <Grid item>
            <TextField
                label="Status"
                select
                value={status}
                onChange={onStatusChange}
            >
                {statuses.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
            </TextField>
        </Grid>
        {/*TODO Slider*/}
    </Grid>
)