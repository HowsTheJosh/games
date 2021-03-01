import React, { Component } from "react";
import { connect } from "react-redux";
class Test extends Component {
  componentDidMount() {
    this.props.stop();
  }
  render() {
    return (
      <div>
        <h1>IN DEVELOPMENT</h1>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { value: state.moveReducer.dir };
};

export default connect(mapStateToProps)(Test);
