import React, { useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/action';
import initialize from '../../utils/initialize';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
const Signup = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axioswal.post(process.env.api_uri + process.env.api_user_reg, {
            email: email,
            password: password,
            password2: password2,
        }).then((data) => {
            if (data.status === 'ok') {
            }
            Router.push('/auth/login')
        }).catch((err) => {
            console.log("Api call unsucessfull", err);
        })
    };


    return (
        <motion.div initial="initial" animate="enter" exit="exit" variants={motionVariants} className="form">

            <br />
            <br />
            <form onSubmit={handleSubmit} id="loginform" className="form-content">
                <div className="container">
                    <h1 style={{ "text-align": "center" }}> Regjistrohu </h1>
                    <Grid container justify="center" direction="column" spacing={2}>
                        <Grid container justify="center" alignItems="center" direction="column" spacing={3}>
                            <Grid item xs={12}>
                                <TextField style={{ "width": "350px" }} id="email" label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} value={email} type="email" className="validate" />
                                <span className="helper-text" data-error="Shënoni një email të vërtetë." data-success=""></span>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField style={{ "width": "350px" }} id="password" label="Fjalëkalimi" variant="outlined" onChange={e => setPassword(e.target.value)} value={password} type="password" className="validate" />
                                <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                <span className="helper-text" data-error="" data-success=""></span>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField style={{ "width": "350px" }} id="confirmpassword" label="Konfirmo Fjalëkalimin" variant="outlined" onChange={e => setPassword2(e.target.value)} value={password2} type="password" className="validate" />
                                <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                <span className="helper-text" data-error="" data-success=""></span>
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Grid>
                            <Grid container justify="center" spacing={2}>
                                <Grid item>
                                    <Button variant="contained" type="submit" color="primary" disableElevation>Regjistrohu</Button>
                                </Grid>
                                <Grid item>
                                    <button type="button" className="google-button" onclick="window.location= '/auth/google/callback'" style={{ "cursor": "pointer" }}>
                                        <span className="google-button__icon">
                                            <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                                                    id="Shape" fill="#EA4335" />
                                                <path
                                                    d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
                                                    id="Shape" fill="#FBBC05" />
                                                <path
                                                    d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
                                                    id="Shape" fill="#4285F4" />
                                                <path
                                                    d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
                                                    fill="#34A853" /></svg>
                                        </span>
                                        <span className="google-button__text">Regjistrohu me Google</span>
                                    </button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </div>
            </form>

        </motion.div>
    );
};

Signup.getInitialProps = async function (ctx) {
    initialize(ctx);
};

export default connect(
    state => state,
    actions
)(Signup);