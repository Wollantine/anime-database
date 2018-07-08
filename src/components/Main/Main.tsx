import * as React from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { Grid, AppBar, Toolbar, Typography, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import teal from '@material-ui/core/colors/teal';
import { AnimeTable } from '../AnimeTable/AnimeTable';

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: teal,
    },
});

const TitleBar = () => (
    <AppBar position="static" color="primary" style={{marginBottom: '20px'}}>
        <Toolbar>
            <Typography variant="headline" color="inherit">
                Anime Database
            </Typography>
        </Toolbar>
    </AppBar>
);

export const Main = () => (
    <MuiThemeProvider theme={theme}>
        <TitleBar/>
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={10}>
                <Grid container direction="column" justify="flex-end" spacing={32}>
                    <Grid item>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs={6}>
                                <SearchForm/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <AnimeTable/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </MuiThemeProvider>
);
