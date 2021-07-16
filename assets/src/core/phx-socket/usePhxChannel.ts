import { Socket } from 'phoenix'
import { useContext, useEffect, useReducer } from 'react'
import PhxSocketContext from './PhxSocketContext'

const usePhxChannel = <T>(
  topic: string,
  // eslint-disable-next-line no-unused-vars
  reducer: (state: T, action: { event: string; payload: object }) => T,
  initialState: T
) => {
  const socket = useContext(PhxSocketContext) as Socket
  const [state, dispatch] = useReducer(reducer, initialState)
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
