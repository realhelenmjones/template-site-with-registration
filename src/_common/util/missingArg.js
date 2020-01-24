import {c_error} from '_common/util/logger'

const ma= () =>{
    c_error(new Error('Missing parameter'));
}

export default ma;
