import * as React from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel, TablePagination } from '@material-ui/core';
import { IRow } from './redux/AnimeTableState';
import { HeadCell } from './HeadCell/HeadCell';
import { Pagination } from './Pagination/Pagination';

export interface IStateProps {
    rows: IRow[];
}

export const AnimeTableView: React.StatelessComponent<IStateProps> = (
    {rows}
) => (
    <Paper>
        <Table>
            <TableHead>
                <TableRow>
                    <HeadCell columnId="title" label="Title"/>
                    <HeadCell columnId="score" label="Score" numeric/>
                    <HeadCell columnId="episodes" label="Episodes" numeric/>
                    <TableCell>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => (
                    <TableRow key={row.id}>
                        <TableCell>{row.title}</TableCell>
                        <TableCell numeric>{row.score}</TableCell>
                        <TableCell numeric>{row.episodes >= 0 ? row.episodes : '-'}</TableCell>
                        <TableCell>{row.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        
        <Pagination/>

    </Paper>
);
