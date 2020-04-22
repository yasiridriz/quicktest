import React, { useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/action';
import initialize from '../../utils/initialize';
import Quicktesttheme from '../../components/quicktest-theme'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Radio, Button, Grid, Divider, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import Link from 'next/link';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
    root: {
    },


}));

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

const AddTest = ({ isAuthenticated }) => {
    const classes = useStyles();

    const [subject, setSubject] = useState('');
    const [title, setTitle] = useState('');
    const [assignmentDate, setAssignmentDate] = useState('');
    const [students, setStudents] = useState([])

    const [questions, setQuestions] = useState([
        {
            text: '',
            points: 0,
            ansType: 'std',
            options: ['']
        }
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const addNewQuestion = () => {
        setQuestions(questions.concat([{ text: "", points: 0, ansType: 'std', options: [''] }]))
    };
    const setQuestion = idx => e => {
        e.preventDefault();
        const newQuestion = questions.map((question, sidx) => {
            if (idx !== sidx) return question;
            return { ...question, [e.target.name]: e.target.value };
        });
        setQuestions(newQuestion);
    }
    const removeQuestion = idx => () => {
        setQuestions(questions.filter((s, sidx) => idx != sidx))
    };
    const addOption = idx => () => {
        const newOption = questions.map((question, sidx) => {
            if (idx !== sidx) return question;
            return { ...question, options: question.options.concat([""]) };
        });
        setQuestions(newOption);
    }
    const addStudent = chip => e => {
        e.preventDefault()
        setStudents([''])
    }
    const test = () => {
        console.log(questions)
        console.log(students)
    }
    return (
        (isAuthenticated && (
        <motion.div initial="initial" animate="enter" exit="exit" variants={motionVariants} className="container">

            <div className="addTest">
                <form action="/tests/add" method="POST" id="addNewForm" className="form-content" style={{ "width": "100%", "marginTop": "50px" }}>
                    <br />
                    <Grid container justify="center" direction="row" spacing={2}>
                        <Grid item sm={3} style={{ "textAlign": "center" }}>
                            <div className="input-field" style={{ "display": "block", "margin": "auto" }}>
                                <TextField style={{ "maxWidth": "300px" }} id="subject" label="Lënda" variant="outlined" onChange={e => setSubject(e.target.value)} value={subject}
                                    type="text" data-val="true" data-val-required="Shënoni Lëndën!" name="subject" className="validate input-field" required />
                            </div>
                        </Grid>
                        <Grid item sm={6} style={{ "textAlign": "center" }}>
                            <div className="input-field" style={{ "display": "block", "margin": "auto" }}>
                                <TextField style={{ "width": "100%" }} id="title" label="Titulli" variant="outlined" onChange={e => setTitle(e.target.value)} value={title}
                                    type="text" data-val="true" data-val-required="Shënoni Titullin!" name="title" className="validate input-field" required />
                            </div>
                        </Grid>
                        <Grid item sm={3} style={{ "textAlign": "center" }}>
                            <div className="input-field" style={{ "display": "block", "margin": "auto" }}>
                                <TextField style={{ "maxWidth": "300px" }} id="assignmentDate" label="Data e Dorëzimit" helperText="(MM/DD/YYYY)" variant="outlined"
                                    onChange={e => setAssignmentDate(e.target.value)} value={assignmentDate}
                                    type="date" data-val="true" data-val-required="Shënoni Datën!" name="title" className="validate input-field" required />

                            </div>
                        </Grid>
                    </Grid>
                    <br />
                    <Divider />
                    <br />
                    <Grid container justify="flex-start" direction="row">
                        <Grid container sm={6} spacing={2}>
                            <Grid item>
                                <Button id="addNewQuestion" onClick={addNewQuestion} variant="contained" color="secondary" disableElevation>
                                    + Shto Pyetje të Re</Button>
                            </Grid>
                            <Grid item >
                                <Button id="reset" variant="contained" color="default" disableElevation>
                                    Pastro</Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end" sm={6}>
                            <Button id="selectUsers" variant="contained" color="default" disableElevation>
                                Zgjedh Nxënësit</Button>
                        </Grid>

                    </Grid>
                    <br />
                    <Divider />
                    <br />
                    <div id="students" className="">
                        <Grid container>
                            <Grid item sm={4}>
                                <h3> Nxënësit që do ta pranojnë testin:</h3>
                            </Grid>
                            <Grid item sm={8}>
                                <ChipInput
                                    fullWidthInput
                                    variant="standard"
                                    value={students}
                                    onAdd={(chip) => addStudent(chip)}
                                    onDelete={(chip, index) => removeStudent(chip, index)}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <Divider />
                    <br />
                    <div id="testBody" className="">
                        <ol className="qList">
                            {questions.map((question, idx) => (
                                <li id="qRow" className="qRow" key={idx}>
                                    <Grid container justify="center" spacing={2}>
                                        <Grid item sm={9}>
                                            <div id="qField" className="qField">
                                                <div className="input-field">
                                                    <TextField multiline style={{ "width": "100%" }} id="text" variant="filled" label="Pyetja"
                                                        onChange={setQuestion(idx)} value={question.text}
                                                        type="text" data-val="true" data-val-required="Shënoni Pyetjen!" name="text" className="validate input-field" required />
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item sm={3}>
                                            <div id="qField" className="qField">
                                                <div className="input-field">
                                                    <TextField style={{ "width": "100%" }} id="points" variant="outlined" label="Pikët"
                                                        onChange={setQuestion(idx)} value={question.points} inputProps={{ pattern: "[0-9]*" }}
                                                        type="text" data-val="true" data-val-required="Caktoni Pikët!" name="points" className="validate input-field" required />
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <br />
                                    <Grid container sm={12} style={{ "marginLeft": "auto", "marginRight": "auto" }} spacing={3}>
                                        <Grid item sm={5}>
                                            <FormControl variant="outlined" style={{ "width": "100%" }}>
                                                <InputLabel id="answerTypeLabel">Lloji i Pëgjigjes</InputLabel>
                                                <Select
                                                    labelId="answerTypeLabel"
                                                    id="answerType"
                                                    value={question.ansType}
                                                    label="Lloji i Pëgjigjes"
                                                    required
                                                    onChange={setQuestion(idx)}
                                                    name="ansType"
                                                >
                                                    <MenuItem value="std">Përgjigje e shkurtë</MenuItem>
                                                    <MenuItem value="par">Paragraf</MenuItem>
                                                    <MenuItem value="mul">Me shumë mundësi</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item sm={5} >
                                            {question.ansType === "std" && (
                                                <div className="input-field answerSample">
                                                    <TextField style={{ "width": "100%" }} disabled id="shortAnswer" variant="outlined" label="Përgjigje e shkurtë"
                                                        type="text" className="input-field" />
                                                </div>
                                            )}
                                            {question.ansType === "par" && (
                                                <div className="input-field answerSample">
                                                    <TextField multiline style={{ "width": "100%" }} disabled id="paragraphAnswer" variant="filled" label="Paragraf"
                                                        type="text" className="input-field" />
                                                </div>
                                            )}
                                            {question.ansType === "mul" && (
                                                <div className="input-field type3 answerSample optList">
                                                    <br />
                                                    <Button variant="contained" disableElevation id="addOption" onClick={addOption(idx)}> + Shto Zgjidhje</Button>
                                                    <br />
                                                    <br />
                                                    {question.options.map(option => (
                                                        <div className="option" className="margin:5em;">
                                                            <TextField style={{ "width": "70%" }} id="text" variant="outlined" label=""
                                                                onChange={setQuestion(idx)} value={option}
                                                                name="options" className="input-field" required />
                                                            <br />
                                                            <br />
                                                        </div>
                                                    ))}
                                                    <br />
                                                </div>
                                            )}
                                        </Grid>

                                    </Grid>
                                    <br />
                                    <div id="qField" className="qField">
                                        <Button id="removeQuestion" color="secondary" variant="contained" disableElevation onClick={removeQuestion(idx)}>
                                            Fshi Pyetjen
                                            </Button>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <Divider />

                                </li>
                            ))}
                        </ol>

                        <a onClick={test} href="#save"
                            className="btn btn-flat waves-effect waves-light deep-purple text-white "
                            style={{ "width": "30%", "margin": "auto", "display": "block" }}>

                            Ruaj</a>
                    </div>
                </form>
                {/* <script>
    $('select').formSelect();
    $('.chips').chips();
    $('.answerSample').hide();
    $('.type1').show();
    


</script> */}
            </div>
        </motion.div>
        )) || (
            <div>
                <h1>Not Allowed</h1>    
            </div>
        )
    );
};

AddTest.getInitialProps = async function (ctx) {
    initialize(ctx);
};

const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);


export default connect(mapStateToProps)(AddTest);