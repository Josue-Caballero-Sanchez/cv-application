import "./App.css";
import React, { useState, useRef } from "react";
import emailIcon from "./assets/email.png";
import phoneIcon from "./assets/phone.png"
import addressIcon from "./assets/map-marker.png"

//education item class
class EducationItem{
  constructor(school, degree, startDate, endDate, location) {
    this.school = school;
    this.degree = degree;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
  }
}

//Custom Input tag
function Input(props){
  return <input 
    type={props.type} 
    id={props.id} 
    name={props.name} 
    placeholder={props.placeholder} 
    onChange={props.onChange}
    ref={props.inputRef}
    value={props.value}
  />
}

//exported function
function App(){
  //variables
  const [addEducation, setAddEducation] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: ""
  });

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const schoolInputRef = useRef(null);
  const degreeInputRef = useRef(null);
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  const locationInputRef = useRef(null);

  //handlers
  const ClearResumeHandler = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: ""
    });

    nameInputRef.current.value = "";
    emailInputRef.current.value = "";
    phoneInputRef.current.value = "";
    addressInputRef.current.value = "";
  };

  const LoadExampleHandler = () =>{
    setFormData({
      name: "John Doe",
      email: "John.Doe@mail.com",
      phone: "+1 123 456 7890",
      address: "Phoenix, Az"
    });

    nameInputRef.current.value = "John Doe";
    emailInputRef.current.value = "John.Doe@mail.com";
    phoneInputRef.current.value = "+1 123 456 7890";
    addressInputRef.current.value = "Phoenix, Az";
  }

  const AddEducationHandler = () => {
    setAddEducation(!addEducation);
  } 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const SaveButtonHandler = () => {
    const educationItem = new EducationItem(formData.school, formData.degree, formData.startDate, formData.endDate, formData.location);
    setEducationList([...educationList, educationItem]);
    setAddEducation(!addEducation);
    console.log(educationList)
  }

  //functions
  function PrintEducationItems(){
    const educationListMapped = educationList.map((educationItem, index) => (
      <button className="education-item" key={index}>
        {educationItem.school}
      </button>
    ));

    return (
      <>
        {educationListMapped}
      </>
    )
  }

  function LoadEducationInputs(){
    return(
      <>
        <label htmlFor="school"><b>School Name</b></label>
        <Input type="text" id="school" name="school" placeholder="Enter School Name" onChange={handleInputChange} />
        <label htmlFor="degree"><b>Degree</b></label>
        <Input type="text" id="degree" name="degree" placeholder="Enter Degree / Field of Study" onChange={handleInputChange}  />
        <label htmlFor="startDate"><b>Start Date</b></label>
        <Input type="text" id="startDate" name="startDate" placeholder="Enter Start Date" onChange={handleInputChange} />
        <label htmlFor="endDate"><b>End Date</b></label>
        <Input type="text" id="endDate" name="endDate" placeholder="Enter End Date" onChange={handleInputChange} />
        <label htmlFor="location"><b>Location</b></label>
        <Input type="text" id="location" name="location" placeholder="Enter Location" onChange={handleInputChange} />
  
        <div className="button-container">
          <button onClick={SaveButtonHandler}>Save</button>
          <button onClick={AddEducationHandler}>Cancel</button>
          <button className="clear-button">Delete</button>
        </div>
      </>
    );
  }


  return (
    <div className="main-container">

      <div className="sidebar-container">
        <div className="item-container">
          <button className="clear-button" onClick={ClearResumeHandler}>Clear Resume</button>
          <button onClick={LoadExampleHandler}>Load Example</button>
        </div>

        <div className="item-container personal-details-container">
          <p className="title"><b>Personal Details</b></p>
          <label htmlFor="name"><b>Full Name</b></label>
          <Input type="text" id="name" name="name" placeholder="First and Last Name" onChange={handleInputChange} inputRef={nameInputRef}></Input>

          <label htmlFor="email"><b>Email</b></label>
          <Input type="email" id="email" name="email" placeholder="Enter Valid Email" onChange={handleInputChange} inputRef={emailInputRef}></Input>

          <label htmlFor="phone"><b>Phone Number</b></label>
          <Input type="tel" id="phone" name="phone" placeholder="Enter Phone Number" onChange={handleInputChange} inputRef={phoneInputRef}></Input>

          <label htmlFor="address"><b>Address</b></label>
          <Input type="text" id="address" name="address" placeholder="City, Country" onChange={handleInputChange} inputRef={addressInputRef}></Input>
        </div>

        <div className="item-container personal-details-container">
          <p className="title"><b>Education</b></p>
          {!addEducation && (
            <>
              <PrintEducationItems />
              <button onClick={AddEducationHandler}>
                <b>+ Education</b>
              </button>
            </>
          )}
          {addEducation && (
            <LoadEducationInputs />
          )}
        </div>
      </div>

      <div className="resume-container">
        <div className="resume-top">
          <p className="name-output">{formData.name}</p>

          <div className="resume-top-info-container">
            {formData.email && (
              <p>
                <img src={emailIcon} alt="email icon" /> {formData.email}
              </p>
            )}

            {formData.phone && (
              <p>
                <img src={phoneIcon} alt="phone icon" /> {formData.phone}
              </p>
            )}

            {formData.address && (
              <p>
                <img src={addressIcon} alt="address icon" /> {formData.address}
              </p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;