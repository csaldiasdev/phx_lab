import { CssBaseline, makeStyles } from '@material-ui/core'
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
}))

function App() {
  const classes = useStyles()
  const wsUrl =
    process.env.NODE_ENV === 'production'
      ? 'wss://phxlab.gigalixirapp.com/socket'
      : 'ws://localhost:4000/socket'

  return (
    <PhxSocketProvider wsUrl={wsUrl}>
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
      </div>
    </PhxSocketProvider>
  )
}

export default App
