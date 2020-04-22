import React, { useState } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/action';
import initialize from '../utils/initialize';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Radio, Button, Grid, Divider, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import Link from 'next/link';
import { motion } from 'framer-motion';


const motionVariants = {
  initial: { scale: 1, y: 60, opacity: 0 },
  enter: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.48, 0.15, 0.25, 0.96], staggerChildren: 0.5 } },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.48, 0.15, 0.25, 0.96] }
  },
}

const Home = ({ isAuthenticated }) => {
  return (
    <motion.div initial="initial" animate="enter" exit="exit" variants={motionVariants} className="container">

      {(isAuthenticated && (
        <div>
          <h1>Mireseerdhet perdorues!</h1>
        </div>
      )) || (
          <div>
            <h1>Mireseerdhet!</h1>
          </div>
        )}
    </motion.div>

  );
  
};
Home.getInitialProps = async function (ctx) {
  initialize(ctx);
};
const mapStateToProps = (state) => (
  { isAuthenticated: !!state.authentication.token }
);

export default connect(mapStateToProps)(Home);