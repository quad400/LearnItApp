import React, { useEffect } from "react";
import {
  checkAuthenticated,
  load_user,
} from "../actions/auth";
import { accountSelfDetail } from "../actions/account";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Layout = (props) => {
  useEffect(() => {
		props.checkAuthenticated();
		props.load_user();
		props.accountSelfDetail()
	},[props])
  return (
    <div>
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};

export default connect(null, {
  checkAuthenticated,
  // googleAuthenticate,
  load_user,
  accountSelfDetail,
})(Layout);
