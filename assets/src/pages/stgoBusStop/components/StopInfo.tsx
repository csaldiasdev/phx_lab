import {
  Chip,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import TimerIcon from '@material-ui/icons/Timer'
import Paper from '@material-ui/core/Paper'

export type BusInfo = {
  busDistance: number
  busPlate: string
  busPrediction: string
}

export type StopInfoProps = {
  responseCode: string
  serviceCode: string
  serviceResponse: string
  buses: BusInfo[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    section1: {
      padding: 15,
    },
    section2: {
      padding: 15,
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
  })
)

export function StopInfo({
  serviceCode,
  responseCode,
  serviceResponse,
  buses,
}: StopInfoProps) {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={6} className={classes.root}>
      <Paper>
        <div className={classes.section1}>
          <Grid container alignItems='center'>
            <Grid item xs>
              <Typography gutterBottom variant='h4'>
                {serviceCode}
              </Typography>
            </Grid>
            <Grid item>
              {responseCode === '11' ? (
                <Chip
                  className={classes.chip}
                  variant='outlined'
                  label='OUT OF SERVICE'
                  color='primary'
                />
              ) : (
                <Chip
                  className={classes.chip}
                  label='IN SERVICE'
                  color='primary'
                />
              )}
            </Grid>
          </Grid>
          <Typography color='textSecondary' variant='body2'>
            {serviceResponse}
          </Typography>
        </div>
        {buses.map(bus => (
          <div key={bus.busPlate}>
            <Divider variant='middle' />
            <div className={classes.section2}>
              <div>
                <Chip
                  className={classes.chip}
                  label={bus.busPlate}
                  icon={<DirectionsBusIcon />}
                />
                <Chip
                  className={classes.chip}
                  label={`${bus.busDistance} Mts`}
                  icon={<GpsFixedIcon />}
                />
              </div>
              <Chip
                className={classes.chip}
                label={bus.busPrediction}
                icon={<TimerIcon />}
              />
            </div>
          </div>
        ))}
      </Paper>
    </Grid>
  )
}
