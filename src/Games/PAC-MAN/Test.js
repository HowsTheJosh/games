import React, { Component } from "react";
import { connect } from "react-redux";
class Test extends Component {
  componentDidMount() {
    this.props.stop();
  }
  render() {
    return <div>IN DEVELOPMENT</div>;
  }
}
const mapStateToProps = (state) => {
  return { value: state.moveReducer.dir };
};

export default connect(mapStateToProps)(Test);
