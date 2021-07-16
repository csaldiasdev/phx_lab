import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
    height: 75
  },
  buttonsList: {
    marginTop: 10,
    flexGrow: 1,
  },
}))

export default function Home() {
  const history = useHistory()
  const classes = useStyles()

  return (
    <Container component='main' className={classes.main} maxWidth='sm'>
      <Typography variant='h2' component='h1' gutterBottom>
        PHX Lab
      </Typography>
      <Typography variant='h5' component='h2' gutterBottom>
        A webapp created for testing purposes with Phoenix Framework.
      </Typography>
      <Typography variant='body1'>Choose an application:</Typography>
      <Grid container spacing={2} className={classes.buttonsList}>
        <Grid item xs={12}>
          <Button
            size='large'
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={() => history.push('/scl-stop')}
          >
            Stgo Bus Stop Info
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            size='large'
            variant='contained'
            disabled
            className={classes.button}
            onClick={() => history.push('')}
          >
            Chat App
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            size='large'
            variant='contained'
            disabled
            className={classes.button}
            onClick={() => history.push('')}
          >
            Realtime Service Status
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
