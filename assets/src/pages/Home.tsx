import { Button, Container, makeStyles, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  }
}));

export default function Home() {
  const history = useHistory()
  const classes = useStyles()

  return (
    <Container component="main" className={classes.main} maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        PHX Lab
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        A webapp created for testing purposes with Phoenix Framework.
      </Typography>
      <Typography variant="body1">Choose an application:</Typography>
      <Button variant="contained" color="primary" onClick={() => history.push('/scl-stop')}>
        Stgo Bus Stop Info
      </Button>
      <Button variant="contained" disabled onClick={() => history.push('')}>
        Chat App
      </Button>
      <Button variant="contained" disabled onClick={() => history.push('')}>
        Realtime Service Status
      </Button>
    </Container>
  )
}
