import { Socket } from 'phoenix'
import { useContext, useEffect, useReducer } from 'react'
import PhxSocketContext from './PhxSocketContext'

const reducer = (
  _state: { event: string; payload: object },
  action: { event: string; payload: object }
): { event: string; payload: object } => ({
  event: action.event,
  payload: action.payload,
})

const usePhxChannel = (topic: string) => {
  const socket = useContext(PhxSocketContext) as Socket
  const [state, dispatch] = useReducer(reducer, { event: '', payload: {} })
  const channel = socket.channel(topic)

  useEffect(() => {
    channel
      .join()
      .receive('ok', ({ messages }) =>
        // eslint-disable-next-line no-console
        console.info('successfully joined channel', messages || '')
      )
      .receive('error', ({ reason }) =>
        // eslint-disable-next-line no-console
        console.error('failed to join channel', reason)
      )

    channel.onMessage = (event: string, payload: object) => {
      dispatch({ event, payload })
      return payload
    }

    return () => {
      channel.leave()
    }
  }, [topic])

  return [state]
}

export default usePhxChannel
