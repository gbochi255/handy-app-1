import {io} from "socket.io-client"
import chatStyle from "./chatStyle"

const socket = io.connect("http://localhost:4000")

export default socket