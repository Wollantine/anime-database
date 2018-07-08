import * as React from 'react';
import { TableCell, TableSortLabel, Tooltip } from "@material-ui/core";
import * as R from 'ramda';
import { IRow } from '../redux/AnimeTableState';

export interface IProps {
    columnId: keyof IRow;
    numeric?: boolean;
    label: string;
}

export interface IStateProps {
    order?: 'asc' | 'desc';
    orderBy: keyof IRow;
}

export interface IActionProps {
    updateTableSorting: (columnId: keyof IRow, orderBy: keyof IRow) => void;
}

export const HeadCellView: React.StatelessComponent<IProps & IStateProps & IActionProps> = (
    {numeric, label, columnId, order, orderBy, updateTableSorting}
) => (
    <TableCell numeric={R.defaultTo(false, numeric)}>
        <Tooltip
            title="Sort by column"
            placement={numeric ? 'bottom-end' : 'bottom-start'}
            enterDelay={300}
        >
            <TableSortLabel
                active={orderBy === columnId}
                direction={R.defaultTo('desc', order)}
                onClick={() => updateTableSorting(columnId, orderBy)}
            >
                {label}
            </TableSortLabel>
        </Tooltip>
    </TableCell>
);
