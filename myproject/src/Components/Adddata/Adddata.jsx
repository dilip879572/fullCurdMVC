import React  from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./Add.css";
import { FaAddressBook } from "react-icons/fa";
import { GiPlastron } from "react-icons/gi";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaFileImage } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { BiLogoGmail } from "react-icons/bi";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Adddata()
{

const [fname, setFname]= useState("");
const [lname, setLname]= useState("");
const [contact, setContact]= useState("");
const [email, setEmail]= useState("");
const [img, setImg]= useState(null);
const [location, setLocation]= useState("");

function handelFname(e){
    setFname(e.target.value)
    
}
function handellname(e){
    setLname(e.target.value)
    
}
function handelEmail(e){
    setEmail(e.target.value)
    
}



async function postData() {
    try {
        if (!fname || !lname || !contact || !email || !location) {
            toast.error("pls fill All input filds");
            return;
        }

        const formData = new FormData();
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('contact', contact);
        formData.append('email', email);
        formData.append('img',img);
        formData.append('location', location);

        const response = await fetch('http://localhost:5000/api/content', {
            method: 'POST',
            body: formData
        });

        console.log(formData);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Result:', result);
        toast.success('Upload successful');
        setTimeout(() => {
            window.location.href = "/Showdata";
          }, 2000);
    } catch (error) {
        console.error('Error:', error);
        toast.error('Upload failed. Please try again.');
    }
}




    return(
        <div className="container-fluid">
<div className="row mt-5">
    <div className="col-sm-4"></div>
    <div className="col-sm-4 mt-5 p-4 boxx">
        <label className="fw-blod"> Frist Name</label>
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><FaAddressBook/></InputGroup.Text>
        <Form.Control
          placeholder="fname"
          aria-label="Username"
          value={fname}
         onChange={handelFname}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <label className="fw-blod"> Last Name</label>
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><GiPlastron/></InputGroup.Text>
        <Form.Control
          placeholder="Username"
          value={lname}
          onChange={handellname}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <label className="fw-blod"> Contact Number</label>
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><BiSolidPhoneCall/></InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          value={contact}
          onChange={(e)=>setContact(e.target.value)}
          type="number"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <label className="fw-blod">Gmail</label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><BiLogoGmail/></InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          value={email}
          onChange={handelEmail}
          type="email"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <label className="fw-blod">File</label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><FaFileImage/></InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          type="file"
       onChange={(e) => setImg(e.target.files[0])}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <label className="fw-blod">Location</label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><FaLocationDot/></InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          type="text"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <button type="button" class="btn btn-primary  btn-block" onClick={postData}>Add the Data</button>

    </div>
    <div className="col-sm-4"></div>
</div>
<ToastContainer/>

        </div>
    )
}
export default Adddata