import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { GiPlastron } from "react-icons/gi";
import { BiSolidPhoneCall, BiLogoGmail } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState(null);
  const [location, setLocation] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

 
  const getData = async () => {
    try {
        let result = await fetch(`http://localhost:5000/api/getcategory/${params.id}`);
        if (result.ok) {
            const data = await result.json();
            console.log(data);
            setFname(data.fname);
            setLname(data.lname);
            setContact(data.contact);
            setEmail(data.email);
            setLocation(data.location);

            // Check if image exists
            if (data.img) {
                setImg(data.img);
            } else {
                setImg(null); // Set img to null if no image exists
            }

            console.log(data);
        } else {
            toast.error('Failed to fetch data.');
        }
    } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again later.');
    }
};

const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fname') {
        setFname(value);
    } else if (name === 'lname') {
        setLname(value);
    } else if (name === 'contact') {
        setContact(value);
    } else if (name === 'email') {
        setEmail(value);
    } else if (name === 'img') {
        setImg(e.target.files[0]); // Always update img state with selected file
    } else if (name === 'location') {
        setLocation(value);
    }
};

const handleSubmit = async () => {
    try {
        const formData = new FormData();
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('contact', contact);
        formData.append('email', email);
        formData.append('img', img);
        formData.append('location', location);

        let result = await fetch(`http://localhost:5000/api/putCategory/${params.id}`, {
            method: "PUT",
            body: formData
        });

        if (result.ok) {
            toast.success('Update Successful!');
            navigate('/Showdata');
        } else {
            toast.error('Update failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again later.');
    }
};

  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-sm-4"></div>
        <div className="col-sm-4 mt-5 p-4 boxx">
          <label className="fw-blod"> First Name</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"></InputGroup.Text>
            <Form.Control
              placeholder="First Name"
              aria-label="First Name"
              name="fname"
              value={fname}
              onChange={handleChange}
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <label className="fw-blod"> Last Name</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><GiPlastron /></InputGroup.Text>
            <Form.Control
              placeholder="Last Name"
              value={lname}
              onChange={handleChange}
              name="lname"
              aria-label="Last Name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <label className="fw-blod"> Contact Number</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><BiSolidPhoneCall /></InputGroup.Text>
            <Form.Control
              placeholder="Contact Number"
              aria-label="Contact Number"
              value={contact}
              onChange={handleChange}
              name="contact"
              type="number"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <label className="fw-blod"> Gmail</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><BiLogoGmail /></InputGroup.Text>
            <Form.Control
              placeholder="Gmail"
              aria-label="Gmail"
              value={email}
              onChange={handleChange}
              name="email"
              type="email"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <label className="fw-blod"> File</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">jh</InputGroup.Text>
            <Form.Control
              placeholder="File"
              aria-label="File"
              type="file"
       name="img" onChange={handleChange} accept="image/*" 


              aria-describedby="basic-addon1"
            />

          </InputGroup>
          <label className="fw-blod"> Location</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"></InputGroup.Text>
            <Form.Control
              placeholder="Location"
              aria-label="Location"
              type="text"
              value={location}
              onChange={handleChange}
              name="location"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <button type="button" className="btn btn-primary btn-block" onClick={handleSubmit}>Update data</button>
        </div>
        <div className="col-sm-4"></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Update;
