import {
  Container,
  CssBaseline,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/Home'
import StgoBusStop from './pages/stgoBusStop/StgoBusStop'
import StgoBusStopInfo from './pages/stgoBusStop/StgoBusStopInfo'
import PhxSocketProvider from './core/phx-socket/PhxSocketProvider'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}))

function App() {
  const classes = useStyles()

  return (
    <PhxSocketProvider wsUrl='wss://phxlab.gigalixirapp.com/socket'>
      <div className={classes.root}>
        <CssBaseline />
        <Router>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/scl-stop'>
            <StgoBusStop />
          </Route>
          <Route path='/scl-stop/:stopCode'>
            <StgoBusStopInfo />
          </Route>
        </Router>
        <footer className={classes.footer}>
          <Container maxWidth='sm'>
            <Typography variant='body1'>
              Phoenix Channels Connection Status :
            </Typography>
          </Container>
        </footer>
      </div>
    </PhxSocketProvider>
  )
}

export default App
