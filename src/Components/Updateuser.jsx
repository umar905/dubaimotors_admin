import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-tabs/style/react-tabs.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const UpdateUser = () => {
  const API = 'https://ntbackend.uz/';
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userFormValues, setUserFormValues] = useState({
    firstName: '',
    lastName: '',
    age: '',
    username: '',
    password: '',
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = (user) => {
    setCurrentUserId(user._id);
    setUserFormValues({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      username: user.username,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormValues({
      ...userFormValues,
      [name]: value,
    });
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(`${API}api/v1/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching users.');
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${API}api/v1/users/${currentUserId}`, userFormValues, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('User updated successfully');
      handleClose();
      getUsers();
    } catch (err) {
      console.error(err);
      alert('Error updating user');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container">
        <div className="users cars">
          {users.map((el) => (
            <div className="user car" key={el._id}>
              <h1>{el.firstName} {el.lastName}</h1>
              <b>Age: {el.age}</b>
              <b>Username: {el.username}</b>
              <button className="btn btn2" onClick={() => handleOpen(el)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button className="btndelete del" onClick={handleClose}>X</button>
          <h2 className="del">Edit User</h2>
          <form className="UpdateUserForm" onSubmit={updateUser}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={userFormValues.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={userFormValues.lastName}
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              required
              value={userFormValues.age}
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={userFormValues.username}
              onChange={handleChange}
            />
        
            <button type="submit">Update</button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateUser;
