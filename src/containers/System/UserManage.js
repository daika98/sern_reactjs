import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllUsersApi,
  createNewUserApi,
  deleteUserApi,
  editUserApi,
} from "../../services/userService";
import "./UserManage.scss";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isAddUserModal: false,
      isEditUserModal: false,
      userEdit: "",
    };
  }

  async componentDidMount() {
    await this.showAllUsers();
  }

  showAllUsers = async () => {
    let response = await getAllUsersApi("ALL");
    if (response && response.code === 3) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleModalButton = () => {
    this.setState({
      isAddUserModal: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isAddUserModal: !this.state.isAddUserModal,
    });
  };
  toggleEditUserModal = () => {
    this.setState({
      isEditUserModal: !this.state.isEditUserModal,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserApi(data);
      if (response && response.code !== 3) {
        alert(response.message);
      } else {
        await this.showAllUsers();
        this.setState({
          isAddUserModal: false,
        });
        emitter.emit("EVENT_CLEAN_MODAL_USER");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleButtonDelete = async (user) => {
    try {
      let response = await deleteUserApi(user.id);
      if (response && response.code === 3) {
        await this.showAllUsers();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleButtonEditUser = (user) => {
    this.setState({
      isEditUserModal: true,
      userEdit: user,
    });
  };

  editUser = async (user) => {
    try {
      let response = await editUserApi(user);
      if (response && response.code === 3) {
        await this.showAllUsers();
        this.setState({
          isEditUserModal: false,
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <>
        <div className="container mt-3">
          <button
            type="button"
            className="btn btn-custom btn-success btn-sm"
            onClick={() => this.handleModalButton()}
          >
            Add New User
            <i className="ml-3 fas fa-plus"></i>
          </button>
          <AddUserModal
            isModal={this.state.isAddUserModal}
            toggleUserModal={this.toggleUserModal}
            createNewUser={this.createNewUser}
          />
          {this.state.isEditUserModal && (
            <EditUserModal
              isModal={this.state.isEditUserModal}
              toggleEditUserModal={this.toggleEditUserModal}
              userEdit={this.state.userEdit}
              editUser={this.editUser}
            />
          )}

          <div className="bg-light mx-auto d-block mt-3 col text-center">
            <h4>User's List</h4>
            <div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th className="col-1"></th>
                    <th className="col-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {arrUsers &&
                    arrUsers.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.email}</td>
                          <td>{item.address}</td>
                          <td>
                            <button
                              type="button"
                              className="custom-btn btn btn-warning"
                              onClick={() => this.handleButtonEditUser(item)}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="custom-btn btn btn-danger"
                              onClick={() => this.handleButtonDelete(item)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
