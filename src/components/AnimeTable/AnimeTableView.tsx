import * as React from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { IRow } from './redux/AnimeTableState';

export interface IStateProps {
    rows: IRow[];
}

export interface IActionProps {

}

export const AnimeTableView: React.StatelessComponent<IStateProps & IActionProps> = (
    {rows}
) => (
    <Paper>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell numeric>Score</TableCell>
                    <TableCell numeric>Episodes</TableCell>
                    <TableCell>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => (
                    <TableRow key={row.id}>
                        <TableCell>{row.title}</TableCell>
                        <TableCell numeric>{row.score}</TableCell>
                        <TableCell numeric>{row.episodes}</TableCell>
                        <TableCell>{row.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
);
