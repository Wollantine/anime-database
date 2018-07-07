import * as React from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { Grid, AppBar, Toolbar, Typography, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
    palette: {
      primary: purple,
      secondary: teal,
    },
  });

export const Main = () => (
    <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    Anime Database
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <SearchForm/>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </MuiThemeProvider>
);
