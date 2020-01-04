import {DEPLOYED} from '../constants'

export const c_log =(msg) => {
    if (!DEPLOYED)
        console.log(msg);
}