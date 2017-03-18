// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitFile } from './../actions/file';
import TransactionsQueue from './TransactionsQueue';

class UploadPage extends Component {
  render () {
    return (<form
      onSubmit={(e) => {
        e.preventDefault();
        this.props.submitFile(this.refs.file.files[0]);
      }}
    >
      <input type="file" ref="file" />
      <input type="submit" />
      <TransactionsQueue />
    </form>);
  }
}

const mapDispatchToProps = dispatch => ({
  submitFile: file => {
    dispatch(submitFile(file));
  }
});

export default connect(undefined, mapDispatchToProps)(UploadPage);
