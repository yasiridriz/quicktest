import Nav from './nav';

import { connect } from 'react-redux';
import actions from '../redux/action'


const Header = () => (
    <>
        <head>
            <title>Quick Test</title>
            <link rel="stylesheet" type="text/css" href="/stylesheets/importer.css" />
        </head>
        <Nav />
    </>
);
const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);

export default connect(mapStateToProps, actions)(Header);