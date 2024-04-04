import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "./sho.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Showdata() {
    const [data, setData] = useState([]);

    useEffect(() => {
        ShowPost();
    }, []);

    function ShowPost() {
        fetch("http://localhost:5000/api/getCategory", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((result) => result.json())
        .then((response) => {
            // Ensure that response is an array before setting data
            if (Array.isArray(response)) {
                setData(response);
            } else {
                // If response is not an array, log the error and set data to an empty array
                console.error('Response is not an array:', response);
                setData([]);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            // Handle error, e.g., show an error toast
            toast.error('Error fetching records.');
            // Set data to an empty array
            setData([]);
        });
    }

    const del = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            fetch(`http://localhost:5000/api/deleteCategory/${id}`, {
                method: "DELETE",
            }).then((result) => {
                if (result.ok) {
                    toast.success('Record deleted successfully', {
                        position: "top-center",
                    });
                    ShowPost();
                } else {
                    toast.error('Error deleting record', {
                        position: "top-center",
                    });
                }
            }).catch(error => {
                console.error('Error deleting record:', error);
                toast.error('Error deleting record', {
                    position: "top-center",
                });
            });
        } else {
            toast.error('Record not deleted', {
                position: "top-center",
            });
        }
    };

    const Search = async (event) => {
        let key = event.target.value.toString(); // Convert to string
    
        if (key) {
            try {
                let response = await fetch(`http://localhost:5000/api/search/${key}`);
                let result = await response.json();
                setData(result);
                // Show success toast for successful search
                toast.success('Search successful!', {
                    position: "top-center",
                });
            } catch (error) {
                console.error('Error searching:', error);
                // Handle error, e.g., show an error toast
                toast.error('Error searching records.');
            }
        } else {
            // If no search key is provided, reset to show all records
            ShowPost();
        }
    };
    
    return (
        <div className="container-fluid mt-5">
            <div className="text-end">
                <Link to="/Adddata">
                    <button className="btn btn-dark">
                        <IoAddCircleSharp /> Add The Data
                    </button>
                </Link>
            </div>
            <div>
                <input
                    type="text"
                    className="form-control"
                    onChange={Search}
                    placeholder="Search by name, contact, location, or email"
                    aria-describedby="basic-addon2"
                />
                {/* Display search results */}

            </div>

            <div className="table-responsive mt-2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Image</th>
                            <th>Location</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.fname}</td>
                                <td>{item.lname}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td><img src={`http://localhost:5000/api/img/${item.img}`} className="card-img-top" alt="Profile" /></td>
                                <td>{item.location}</td>
                                <td><button className="btn btn-danger btn-sm " onClick={() => del(item._id)}>Delete</button></td>
                                <td>
                                    <Link to={`/Update/${item._id}`}>
                                        <button className="btn btn-success btn-sm px-3">Edit</button>
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <ToastContainer />
        </div>

    );
}

export default Showdata;
