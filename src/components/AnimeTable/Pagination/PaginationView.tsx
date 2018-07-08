import * as React from 'react';
import { TablePagination } from "@material-ui/core";


export interface IStateProps {
    count: number;
    page: number;
    pageSize: number;
}

export interface IActionProps {
    onChangePage: (page: number) => void;
}

export const PaginationView = ({count, page, pageSize, onChangePage}) => (
    <TablePagination
        component="div"
        count={count}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[pageSize]}
        page={page}
        backIconButtonProps={{
            'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
            'aria-label': 'Next Page',
        }}
        onChangePage={(_, page) => onChangePage(page)}
    />
);
