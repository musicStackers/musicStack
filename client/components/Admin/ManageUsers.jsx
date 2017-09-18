import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton } from 'material-ui';
import { fetchUsers, deleteUser, makeUserAdmin } from '../../store/reducers/users';

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
  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  render() {
    const { users, deleteUser, makeUserAdmin } = this.props;

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
              users.length && users.sort((a, b) => a.id - b.id).map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableRowColumn>
                      {user.email}
                    </TableRowColumn>
                    <TableRowColumn>
                      <IconButton>
                        <RemoveIcon onClick={() => deleteUser(user.id)} />
                      </IconButton>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        toggled={user.isAdmin}
                        onToggle={() => makeUserAdmin(user.id, user.isAdmin)}
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

const mapDispatch = (dispatch, ownProps) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  deleteUser: userId => dispatch(deleteUser(userId)),
  makeUserAdmin: (userId, isAdmin) => dispatch(makeUserAdmin(userId, isAdmin)),
});

export default connect(mapState, mapDispatch)(ManageUsers);
