// OM NAMASIVAYA
import { server } from "./server.js";
const port = 3200;

server.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}/`);
    
})