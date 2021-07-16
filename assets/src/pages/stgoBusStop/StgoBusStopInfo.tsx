import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { ArrowBack } from '@material-ui/icons'
import { useHistory, useParams } from 'react-router-dom'
import usePhxChannel from '../../core/phx-socket/usePhxChannel'
import { StopInfo, StopInfoProps, BusInfo } from './components/StopInfo'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

const stopChannelPayloadConverter = (payload: { [key: string]: any }) => {
  const typedPayload: StopInfoProps[] = []

  if (!payload.predictions) {
    return typedPayload
  }

  const predictions = payload.predictions as { [key: string]: any }[]

  predictions.forEach(prediction => {
    const convertedBusesPayload: BusInfo[] = []

    if (prediction.bus_plate_1 !== '') {
      convertedBusesPayload.push({
        busPlate: prediction.bus_plate_1 as string,
        busDistance: prediction.bus_distance_1 as number,
        busPrediction: prediction.bus_prediction_1 as string,
      })
    }

    if (prediction.bus_plate_2 !== '') {
      convertedBusesPayload.push({
        busPlate: prediction.bus_plate_2 as string,
        busDistance: prediction.bus_distance_2 as number,
        busPrediction: prediction.bus_prediction_2 as string,
      })
    }

    const convertedPayload: StopInfoProps = {
      responseCode: prediction.response_code as string,
      serviceCode: prediction.service_code as string,
      serviceResponse: prediction.service_response as string,
      buses: convertedBusesPayload,
    }

    typedPayload.push(convertedPayload)
  })

  return typedPayload
}

type StopChannelState = {
  stopPredictions: StopInfoProps[]
}

const reducer = (
  state: StopChannelState,
  action: { event: string; payload: object }
): StopChannelState => {
  switch (action.event) {
    case 'stop_prediction':
      return {
        stopPredictions: stopChannelPayloadConverter(action.payload),
      }
    default:
      return state
  }
}

export default function StgoBusStopInfo() {
  const { stopCode } = useParams<{ stopCode: string }>()

  const history = useHistory()
  const classes = useStyles()
  const channelName = `scl_stop/stop:${stopCode}`

  const [state] = usePhxChannel(channelName, reducer, {
    stopPredictions: [],
  })

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => history.push('/scl-stop')}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {stopCode}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {state.stopPredictions.map(prediction => (
            <StopInfo
              key={prediction.serviceCode}
              responseCode={prediction.responseCode}
              serviceCode={prediction.serviceCode}
              serviceResponse={prediction.serviceResponse}
              buses={prediction.buses}
            />
          ))}
        </Grid>
      </div>
    </>
  )
}
