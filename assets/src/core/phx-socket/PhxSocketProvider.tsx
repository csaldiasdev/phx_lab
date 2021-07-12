import { useEffect, FunctionComponent } from 'react'
import { Socket } from 'phoenix'
import PhxSocketContext from './PhxSocketContext'

const PhxSocketProvider: FunctionComponent<{ wsUrl: string }> = ({
  wsUrl,
  children,
}) => {
  const socket = new Socket(wsUrl)

  useEffect(() => {
    socket.connect()
  }, [wsUrl])

  return (
    <PhxSocketContext.Provider value={socket}>
      {children}
    </PhxSocketContext.Provider>
  )
}

export default PhxSocketProvider
