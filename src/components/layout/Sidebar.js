import React from 'react';
import {Link} from 'react-router-dom';

export default  () => {
    return (
       <Link to='/client/add' className='btn btn-info btn-block'>
        <i className='fas fa-plus'></i> New
       </Link>
    )
}
