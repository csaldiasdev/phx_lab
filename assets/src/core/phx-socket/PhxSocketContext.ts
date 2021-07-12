import { Socket } from 'phoenix'
import { createContext } from 'react'

const PhxSocketContext = createContext<Partial<Socket>>({})

export default PhxSocketContext
