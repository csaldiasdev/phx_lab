import {
  AppBar,
  Container,
  IconButton,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { useHistory, useRouteMatch } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function StgoBusStop() {
  const history = useHistory()
  const classes = useStyles()
  const match = useRouteMatch()

  const onStopSubmit = (event: any) => {
    event.preventDefault()
    const stopId = event.target.stopId.value as string
    history.push(`${match.path}/${stopId}`)
  }

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={() => history.push('/')}>
            <ArrowBack />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Santiago bus stop info
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component='main' className={classes.main} maxWidth='sm'>
        <Typography variant='h2' component='h1' gutterBottom>
          Type you bus stop
        </Typography>
        <form noValidate autoComplete='off' onSubmit={onStopSubmit}>
          <TextField id='standard-basic' label='Standard' name='stopId' />
        </form>
      </Container>
    </>
  )
}
