import Header from './header';
import Footer from './footer';
import { connect } from 'react-redux';
import actions from '../redux/action';


const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);
const mapStateToProps = (state) => (
  { isAuthenticated: !!state.authentication.token }
);

export default connect(mapStateToProps, actions)(Layout);