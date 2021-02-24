import React, { Component } from "react";
import { connect } from "react-redux";
class Test extends Component {
  render() {
    return <div>HAHHAHAHAH{this.props.value}</div>;
  }
}
const mapStateToProps = (state) => {
  //   console.log(state);
  return { value: state.auth.dir };
};

export default connect(mapStateToProps)(Test);
// export default Test;
