import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _, { isEmpty } from "lodash";

class EditUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: 0,
      roleId: "",
    };
  }

  componentDidMount() {
    let user = this.props.userEdit;
    if (user && !isEmpty(user)) {
      this.setState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        roleId: user.roleId,
      });
    }
  }

  toggle = () => {
    this.props.toggleEditUserModal();
  };
  handleInput = (event, id) => {
    let copyState = this.state;
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkInputValue = () => {
    let isValid = true;
    let arrInput = ["firstName", "lastName", "address", "phoneNumber"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleOptionSubmit = (event, id) => {
    let copyState = this.state;
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleButtonSaveChange = () => {
    let isValid = this.checkInputValue();

    if (isValid) {
      this.props.editUser(this.state);
    }
  };

  render() {
    let isModal = this.props.isModal;
    return (
      <div>
        <Modal
          isOpen={isModal}
          toggle={() => {
            this.toggle();
          }}
          size="lg"
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
            className="bg-success"
          >
            Edit User
          </ModalHeader>
          <ModalBody>
            <div className="container col-12">
              <div className="mt-5 mx-auto">
                <h4> Edit User</h4>
              </div>

              <form className="mt-3">
                <div className="form-row">
                  <div className="form-group col-6">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstname"
                      onChange={(event) => this.handleInput(event, "firstName")}
                      value={this.state.firstName}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastname"
                      onChange={(event) => this.handleInput(event, "lastName")}
                      value={this.state.lastName}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Viet Nam"
                    onChange={(event) => this.handleInput(event, "address")}
                    value={this.state.address}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group col-4">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      placeholder="0989123456"
                      onChange={(event) =>
                        this.handleInput(event, "phoneNumber")
                      }
                      value={this.state.phoneNumber}
                    />
                  </div>
                  <div className="form-group col-4">
                    <label htmlFor="gender">Sex</label>
                    <select
                      name="gender"
                      className="form-control"
                      onChange={(event) =>
                        this.handleOptionSubmit(event, "gender")
                      }
                    >
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </select>
                  </div>
                  <div className="form-group col-4">
                    <label htmlFor="roleId">Role</label>
                    <select
                      name="roleId"
                      className="form-control"
                      onChange={(event) =>
                        this.handleOptionSubmit(event, "roleId")
                      }
                    >
                      <option value="1">Admin</option>
                      <option value="2">Doctor</option>
                      <option value="3">Patient</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="submit"
              className="btn btn-success btn-add-user-modal"
              onClick={() => {
                this.handleButtonSaveChange();
              }}
            >
              Save
            </button>
            <button
              type="submit"
              className="btn btn-warning btn-add-user-modal"
              onClick={() => {
                this.toggle();
              }}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditUserModal;
