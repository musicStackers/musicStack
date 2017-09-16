import React, { Component } from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import { H2, H3 } from '../reusableStyles';

// Styles
const styles = {
};

/**
 * COMPONENT
 */
class ManageUsers extends Component {

  constructor(props) {
    super(props);
    this.handleToggleAdmin = this.handleToggleAdmin.bind(this);
  }

  handleToggleAdmin(evt) {
    // evt.preventDefault();
    // const campus = {
    //   name: evt.target.campusName.value,
    //   image: evt.target.campusImage.value,
    //   description: evt.target.campusDescription.value
    // };
    // this.props.addCampus(campus);
  }

  render() {
    const { users } = this.props;

    return (
      <MuiThemeProvider>
        <Table selectable={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>User Email</TableHeaderColumn>
              <TableHeaderColumn>Delete User</TableHeaderColumn>
              <TableHeaderColumn>Admin</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              users.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableRowColumn>
                      {user.email}
                    </TableRowColumn>
                    <TableRowColumn>
                      X
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        onToggle={this.handleToggleAdmin}
                      />
                    </TableRowColumn>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </MuiThemeProvider>

    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => ({
  users: state.users,
});

const mapDispatch = (dispatch, ownProps) => {
  let { history } = ownProps;
  return {
    // addCampus: (campus) => {
    //   dispatch(addCampusThunk(campus, history));
  }
};

export default connect(mapState, mapDispatch)(ManageUsers);
