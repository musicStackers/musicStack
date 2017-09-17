import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton } from 'material-ui';

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
import RemoveIcon from 'material-ui/svg-icons/content/clear';

// Styles
const styles = {
};

/**
 * COMPONENT
 */
class ManageUsers extends Component {

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleToggleAdmin = this.handleToggleAdmin.bind(this);
  }

  handleRemove(evt) {
  }

  handleToggleAdmin(evt) {
  }

  render() {
    const { users } = this.props;

    return (
      <MuiThemeProvider>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckboe={false}
          >
            <TableRow>
              <TableHeaderColumn>User Email</TableHeaderColumn>
              <TableHeaderColumn>Delete User</TableHeaderColumn>
              <TableHeaderColumn>Admin</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              users.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableRowColumn>
                      {user.email}
                    </TableRowColumn>
                    <TableRowColumn>
                      <IconButton>
                        <RemoveIcon />
                      </IconButton>
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
