import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Deletesuggestion = () => {
    const API = 'https://ntbackend.uz/';

    const [suggestion, setSuggestion] = useState([])
    const deleteSuggestion = async (id) => {
        try {
          await axios.delete(`${API}api/v1/suggestions/${id}`, {
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
      
  const getSuggestins = async () => {
    try {
      const res = await axios.get(`${API}api/v1/suggestions`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuggestion(res.data);
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching data.');
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
    getSuggestins();
  }, []);
  return (
    <>
       <div className="container">
        <div className="cars">
        {suggestion.map((el)=>{
                        return(
                          <>
                            <div className="car">
                                <h2><b>Name: </b> {el.name}</h2>
                                <h2><b>Comment: </b>{el.description}</h2>
                                <button className="btn btn2" onClick={() => deleteSuggestion(el._id)}>Delete</button>
                            </div>
                          </>
                        )
                      })}
        </div>
    </div>    
    </>
  )
}

export default Deletesuggestion
