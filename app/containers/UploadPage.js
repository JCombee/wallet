// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitFile } from './../actions/file';

class UploadPage extends Component {
  render() {
    return (<form
      onSubmit={() => {
        this.props.submitFile(this.refs.file.files[0]);
      }}
    >
      <input type="file" ref="file" />
      <input type="submit" />
    </form>);
  }
}

const mapDispatchToProps = dispatch => ({
  submitFile: file => {
    console.log(file);
    dispatch(submitFile(file));
  }
});

export default connect(undefined, mapDispatchToProps)(UploadPage);
