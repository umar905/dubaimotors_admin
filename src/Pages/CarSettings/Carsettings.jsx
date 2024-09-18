import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Updateuser from '../../Components/Updateuser';
import Suggestions from '../../Components/Suggestions';
import Deletesuggestion from '../../Components/Deletesuggestion';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Carsettings = () => {
  const API = 'https://ntbackend.uz/';
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentCarId, setCurrentCarId] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    status: '',
    city: '',
    year: '',
    model: '',
    phone: '',
    telegram: '',
  });
  const [userFormValues, setUserFormValues] = useState({
    firstName: '',
    lastName: '',
    age: '',
    username: '',
    password: '',
  });

  const handleOpen = (car) => {
    setCurrentCarId(car._id);
    setFormValues({
      name: car.name,
      description: car.description,
      price: car.price,
      status: car.status,
      city: car.city,
      year: car.year,
      model: car.model,
      phone: car.phone,
      telegram: car.telegram,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const getCars = async () => {
    try {
      const res = await axios.get(`${API}api/v1/cars`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCars(res.data);
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching data.');
    }
  };

  const createCard = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', file);
    formData.append('name', formValues.name);
    formData.append('description', formValues.description);
    formData.append('price', formValues.price);
    formData.append('status', formValues.status);
    formData.append('city', formValues.city);
    formData.append('year', formValues.year);
    formData.append('model', formValues.model);
    formData.append('phone', formValues.phone);
    formData.append('telegram', formValues.telegram);

    try {
      await axios.post(`${API}api/v1/cars`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };

  const deleteCar = async (id) => {
    try {
      await axios.delete(`${API}api/v1/cars/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      window.location.reload();
    } catch (error) {
      alert('Error deleting car');
    }
  };

  const updateCard = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageFile) {
      formData.append('files', imageFile);
    }
    formData.append('name', formValues.name);
    formData.append('description', formValues.description);
    formData.append('price', formValues.price);
    formData.append('status', formValues.status);
    formData.append('city', formValues.city);
    formData.append('year', formValues.year);
    formData.append('model', formValues.model);
    formData.append('phone', formValues.phone);
    formData.append('telegram', formValues.telegram);

    try {
      await axios.patch(`${API}api/v1/cars/${currentCarId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Car updated successfully');
      handleClose();
      getCars();
    } catch (err) {
      alert('Error updating car');
    }
  };

  const handleChange = (e) => {
    if (e.target.name in formValues) {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name in userFormValues) {
      setUserFormValues({
        ...userFormValues,
        [e.target.name]: e.target.value,
      });
    }
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
      alert('An error occurred while fetching data.');
    }
  };

  const createUser = async (e) => {
    e.preventDefault();

    // Validate age input
    const age = Number(userFormValues.age);
    if (isNaN(age) || age <= 0) {
      alert('Age must be a positive number.');
      return;
    }

    // Define constraints
    const MIN_AGE = 0;
    const MAX_AGE = 120;

    if (age < MIN_AGE || age > MAX_AGE) {
      alert(`Age must be between ${MIN_AGE} and ${MAX_AGE}.`);
      return;
    }

    try {
      await axios.post(`${API}api/v1/users`, { ...userFormValues, age }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('User created successfully');
      setUserFormValues({
        firstName: '',
        lastName: '',
        age: '',
        username: '',
        password: '',
      });
      getUsers(); // Refresh the user list
    } catch (err) {
      alert('Error creating user: ' + err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}api/v1/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      window.location.reload();
    } catch (error) {
      alert('Error deleting user');
    }
  };

  useEffect(() => {
    getUsers();
    getCars();
  }, []);

  return (
    <div className="container">
      <Tabs forceRenderTabPanel defaultIndex={0}>
        <TabList>
          <Tab>Cars Settings</Tab>
          <Tab>Users Settings</Tab>
          <Tab>Suggestions Settings</Tab>
        </TabList>

        <TabPanel>
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>Create Car</Tab>
              <Tab>All Cars</Tab>
              <Tab>Delete Cars</Tab>
              <Tab>Update Cars</Tab>
            </TabList>

            {/* Create Car Form */}
            <TabPanel>
              <h1 className="head">Create Cars</h1>
              <form className="createcarform" onSubmit={createCard}>
                <label className='ss' htmlFor="pg"><h1>+</h1></label>
                <input
                  id='pg'
                  required
                  type="file"
                  name="carImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  placeholder="Upload Image"
                  className='pgg'
                />
                <input required type="text" name="name" placeholder="Car Name" onChange={handleChange} />
                <input required type="text" name="description" placeholder="Description" onChange={handleChange} />
                <input required type="number" name="price" placeholder="Price" onChange={handleChange} />
                <input required type="text" name="status" placeholder="Status" onChange={handleChange} />
                <input required type="text" name="city" placeholder="City" onChange={handleChange} />
                <input required type="text" name="year" placeholder="Year" onChange={handleChange} />
                <input required type="text" name="model" placeholder="Model" onChange={handleChange} />
                <input required type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                <input required type="text" name="telegram" placeholder="Telegram" onChange={handleChange} />
                <button type="submit">Submit</button>
              </form>
            </TabPanel>

            {/* Display All Cars */}
            <TabPanel>
              <h1 className="head">All Cars</h1>
              <div className="cars">
                {cars.map((el) => (
                  <div className="car" key={el._id}>
                    <img src={`https://pub-3cc294ad2dda41aca99be0d7c3914919.r2.dev/${el.imageUrl[0]}`} alt={el.name} />
                    <h1>{el.model} {el.name}</h1>
                    <b>{el.city}</b>
                    <h2>{el.status.toUpperCase()}</h2>
                    <p>{el.description.slice(0, 200)}</p>
                    <b>{el.price}$</b>
                    <p>{el.year}</p>
                  </div>
                ))}
              </div>
            </TabPanel>

            {/* Delete Cars */}
            <TabPanel>
              <h1 className="head">Delete Car</h1>
              <div className="cars">
                {cars.map((el) => (
                  <div className="car" key={el._id}>
                    <img src={`https://pub-3cc294ad2dda41aca99be0d7c3914919.r2.dev/${el.imageUrl[0]}`} alt={el.name} />
                    <h1>{el.model} {el.name}</h1>
                    <h2>{el.status.toUpperCase()}</h2>
                    <b>{el.price}$</b>
                    <br />
                    <button className="btn btn2" onClick={() => deleteCar(el._id)}>Delete</button>
                  </div>
                ))}
              </div>
            </TabPanel>

            {/* Update Cars */}
            <TabPanel>
              <h1 className="head">Update Car</h1>
              <div className="cars">
                {cars.map((el) => (
                  <div className="car" key={el._id}>
                    <img src={`https://pub-3cc294ad2dda41aca99be0d7c3914919.r2.dev/${el.imageUrl[0]}`} alt={el.name} />
                    <h1>{el.model} {el.name}</h1>
                    <h2>{el.status.toUpperCase()}</h2>
                    <b>{el.price}$</b>
                    <br />
                    <button className="btn btn2" onClick={() => handleOpen(el)}>Update</button>
                  </div>
                ))}
              </div>
            </TabPanel>
          </Tabs>
        </TabPanel>

        {/* second */}
        <TabPanel>
          <Tabs>
          <TabList>
              <Tab>Create User</Tab>
              <Tab>All Users</Tab>
              <Tab>Delete Users</Tab>
              <Tab>Update User</Tab>
            </TabList>
            <TabPanel>
            <h1 className="head">Create User</h1>
          <form className="createcarform" onSubmit={createUser}>
            <input
              required
              type="text"
              name="firstName"
              placeholder="First Name"
              value={userFormValues.firstName}
              onChange={handleChange}
            />
            <input
              required
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={userFormValues.lastName}
              onChange={handleChange}
            />
            <input
              required
              type="number"
              name="age"
              placeholder="Age"
              value={userFormValues.age}
              onChange={handleChange}
            />
            <input
              required
              type="text"
              name="username"
              placeholder="Username"
              value={userFormValues.username}
              onChange={handleChange}
            />
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              value={userFormValues.password}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
            </TabPanel>
            <TabPanel>
              <h1>ALL Users</h1>
              <div className="cars">
                {users.map((el)=>{
                 return(
                  <div className="car">
                  <h1>{el.firstName} {el.lastName}</h1>
                  <b>Age: {el.age}</b>
                  <b>User Name: {el.username}</b>

                </div>
                 )
                })}
              </div>
            </TabPanel>
            <TabPanel>
              <h1>Delete user</h1>
              <div className="cars">

            {users.map((el)=>{
                 return(
                  <div className="car">
                  <h1>{el.firstName} {el.lastName}</h1>
                  <b>Age: {el.age}</b>
                  <b>User Name: {el.username}</b>
                  <button className="btn btn2" onClick={() => deleteUser(el._id)}>Delete</button>
                </div>
                 )
                })}
              </div>
            </TabPanel>
            <TabPanel>
              <h1>Update</h1>
              <Updateuser/>
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <Tabs>
          <TabList>
              <Tab>All Suggestions</Tab>
              <Tab>Delete Suggestions</Tab>
            </TabList>
            <TabPanel>
                <h1>All Suggestions</h1>
                <Suggestions/>
            </TabPanel>
            <TabPanel>
              <h1>Delete Suggestions</h1>
              <Deletesuggestion/>
            </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>

      {/* Modal for updating car */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button className="btndelete del" onClick={handleClose}>X</button>
          <h2 className="del">Edit Car</h2>
          <form className="AddTeacherForm" onSubmit={updateCard}>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleImageFileChange} // Handle image file change
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formValues.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              required
              value={formValues.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              value={formValues.price}
              onChange={handleChange}
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              required
              value={formValues.status}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              value={formValues.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              required
              value={formValues.year}
              onChange={handleChange}
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              required
              value={formValues.model}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              required
              value={formValues.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="telegram"
              placeholder="Telegram"
              required
              value={formValues.telegram}
              onChange={handleChange}
            />
            <button type="submit">Update</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Carsettings;
