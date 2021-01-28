import React from 'react';

import classes from './Spinner.module.css';

const spinner = () => (
    <div className={classes.center}>
    <div className={classes.Spinnerborder}></div>
    <h2 style={{marginTop:'20px'}} >Loading ...</h2>

    </div>
);

export default spinner;