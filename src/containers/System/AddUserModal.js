import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class AddUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
      gender: 0,
      roleId: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAN_MODAL_USER", () => {
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: "",
        gender: 0,
        roleId: "",
      });
    });
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleUserModal();
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
    let arrInput = [
      "firstName",
      "lastName",
      "email",
      "password",
      "address",
      "phoneNumber",
    ];
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

  handleButtonCreateNewUser = () => {
    let isValid = this.checkInputValue();

    if (isValid) {
      this.props.createNewUser(this.state);
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
            Create New User
          </ModalHeader>
          <ModalBody>
            <div className="container col-12">
              <div className="mt-5">
                <h3>Create a new user</h3>
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
                <div className="form-row">
                  <div className="form-group col-6">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      placeholder="example@gmail.com"
                      onChange={(event) => this.handleInput(event, "email")}
                      value={this.state.email}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={(event) => this.handleInput(event, "password")}
                      value={this.state.password}
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
                      <option value="2">---</option>
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
                      <option value="0">---</option>
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
                this.handleButtonCreateNewUser();
              }}
            >
              Create
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

export default AddUserModal;
