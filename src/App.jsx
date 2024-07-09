import "./App.css";
import React, { useState, useRef } from "react";
import emailIcon from "./assets/email.png";
import phoneIcon from "./assets/phone.png"
import addressIcon from "./assets/map-marker.png"
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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

class ExperienceItem{
    constructor(company, position, startDate, endDate, location, description){
      this.company = company;
      this.position = position;
      this.startDate = startDate;
      this.endDate = endDate;
      this.location = location;
      this.description = description;
    }
}

//Custom Input tag
function Input(props){
  return (
    <input 
      type={props.type} 
      id={props.id} 
      name={props.name} 
      placeholder={props.placeholder} 
      onChange={props.onChange}
      ref={props.inputRef}
      value={props.value}
    />
  );
}

function TextArea(props){
  return(
    <textarea
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      ref={props.inputRef}
      value={props.value}
      rows={props.rows}
      columns={props.columns}
      style={{
        resize: 'none' 
      }}
    >
    </textarea>
  )
}

//functions
function LoadEducationInputs({handleInputChange, formData, SaveButtonHandler, AddEducationHandler, DeleteEducationHandler}){
  return(
    <>
      <label htmlFor="school"><b>School Name</b></label>
      <Input type="text" id="school" name="school" placeholder="Enter School Name" onChange={handleInputChange} value={formData.school} />
      <label htmlFor="degree"><b>Degree</b></label>
      <Input type="text" id="degree" name="degree" placeholder="Enter Degree / Field of Study" onChange={handleInputChange} value={formData.degree} />
      <label htmlFor="startDate"><b>Start Date</b></label>
      <Input type="text" id="startDate" name="startDate" placeholder="Enter Start Date" onChange={handleInputChange} value={formData.startDate} />
      <label htmlFor="endDate"><b>End Date</b></label>
      <Input type="text" id="endDate" name="endDate" placeholder="Enter End Date" onChange={handleInputChange} value={formData.endDate} />
      <label htmlFor="location"><b>Location</b></label>
      <Input type="text" id="location" name="location" placeholder="Enter Location" onChange={handleInputChange} value={formData.location} />

      <div className="button-container">
        <button onClick={SaveButtonHandler}>Save</button>
        <button onClick={AddEducationHandler}>Cancel</button>
        <button onClick={DeleteEducationHandler} className="clear-button">Delete</button>
      </div>
    </>
  );
}

function LoadExperienceInputs({handleInputChange, formData, SaveExperienceButtonHandler, AddExperienceHandler, DeleteExperienceHandler}){
  return(
    <>
      <label htmlFor="company"><b>Company Name</b></label>
      <Input type="text" id="company" name="company" placeholder="Enter Company Name" onChange={handleInputChange} value={formData.company} />
      <label htmlFor="position"><b>Position Title</b></label>
      <Input type="text" id="postion" name="position" placeholder="Enter Position Title" onChange={handleInputChange} value={formData.position} />
      <label htmlFor="experienceStartDate"><b>Start Date</b></label>
      <Input type="text" id="experienceStartDate" name="experienceStartDate" placeholder="Enter Start Date" onChange={handleInputChange} value={formData.experienceStartDate} />
      <label htmlFor="experienceEndDate"><b>End Date</b></label>
      <Input type="text" id="experienceEndDate" name="experienceEndDate" placeholder="Enter End Date" onChange={handleInputChange} value={formData.experienceEndDate} />
      <label htmlFor="experienceLocation"><b>Location</b></label>
      <Input type="text" id="experienceLocation" name="experienceLocation" placeholder="Enter Location" onChange={handleInputChange} value={formData.experienceLocation} />
      <label htmlFor="experienceDescription"><b>Description</b></label>
      <TextArea name="experienceDescription" id="experienceDescription" rows="5" columns="5" placeholder="Enter Description" onChange={handleInputChange} value={formData.experienceDescription}></TextArea>

      <div className="button-container">
        <button onClick={SaveExperienceButtonHandler}>Save</button>
        <button onClick={AddExperienceHandler}>Cancel</button>
        <button onClick={DeleteExperienceHandler} className="clear-button">Delete</button>
      </div>
    </>
  );
}

function LoadEducationItemsOnResume({ educationList }){
  return (
    <>
      {educationList.map((item, index) => (
        <div className="education-container" key={index}>
          <div>
            <p className="dates">{item.startDate} - {item.endDate}</p>
            <p>{item.location}</p>
          </div>
          
          <div>
            <p className="dates"><b>{item.school}</b></p>
            <p>{item.degree}</p>
          </div>
        </div>
      ))}
    </>
  );
}

function LoadExperienceItemsOnResume({ experienceList }){
  return (
    <>
      {experienceList.map((item, index) => (
        <div className="experience-container" key={index}>
          <div className="left-experience-container">
            <p className="dates">{item.startDate} - {item.endDate}</p>
            <p>{item.location}</p>
          </div>
          
          <div className="right-experience-container">
            <p className="dates space"><b>{item.company}</b></p>
            <p>{item.position}</p>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </>
  );
}

//exported function
function App(){
  //variables
  const [addEducation, setAddEducation] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [itemSelected, setItemSelected] = useState(-1);
  const [experienceItemSelected, setExperienceItemSelected] = useState(-1);
  const [experienceList, setExperienceList] = useState([]);
  const [addExperience, setAddExperience] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profile: "",
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
    company: "",
    position: "",
    experienceStartDate: "",
    experienceEndDate: "",
    experienceLocation: "",
    experienceDescription: ""
  });

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const resumeContainerRef = useRef(null);

  //handlers
  const ClearResumeHandler = () => {
    setAddEducation(false);
    setAddExperience(false)

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
      company: "",
      position: "",
      experienceStartDate: "",
      experienceEndDate: "",
      experienceLocation: "",
      experienceDescription: ""
    });

    nameInputRef.current.value = "";
    emailInputRef.current.value = "";
    phoneInputRef.current.value = "";
    addressInputRef.current.value = "";
    profileInputRef.current.value = "";

    setEducationList([]);
    setExperienceList([]);
  };

  const LoadExampleHandler = () =>{
    setAddEducation(false);
    setAddExperience(false)

    setFormData({
      name: "John Doe",
      email: "John.Doe@mail.com",
      phone: "+1 123 456 7890",
      address: "Phoenix, Az",
      profile: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum, dui quis vulputate varius, nibh augue fermentum enim, nec molestie nisl sem eu nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In in orci ut enim commodo congue id vitae lectus. Quisque condimentum gravida massa. Nam posuere malesuada eros. Duis molestie, quam et ultrices semper, tortor velit tempus sem, quis laoreet arcu urna et mi. Aenean non felis scelerisque, pharetra lectus hendrerit, commodo mauris."
    });

    nameInputRef.current.value = "John Doe";
    emailInputRef.current.value = "John.Doe@mail.com";
    phoneInputRef.current.value = "+1 123 456 7890";
    addressInputRef.current.value = "Phoenix, Az";
    profileInputRef.current.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum, dui quis vulputate varius, nibh augue fermentum enim, nec molestie nisl sem eu nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In in orci ut enim commodo congue id vitae lectus. Quisque condimentum gravida massa. Nam posuere malesuada eros. Duis molestie, quam et ultrices semper, tortor velit tempus sem, quis laoreet arcu urna et mi. Aenean non felis scelerisque, pharetra lectus hendrerit, commodo mauris.";

    if(educationList.length === 0){
      const educationItem = new EducationItem("Arizona State University", "Bachelors in Computer Science", "08-2021", "present", "Tempe Arizona, US");
      const educationItem2 = new EducationItem("London City University", "Bachelors in Economics", "08-2017", "05-2021", "New York City, US");
      setEducationList([...educationList, educationItem, educationItem2]);
    }

    if(experienceList.length === 0){
      const experienceItem = new ExperienceItem("Umberlla Inc", "UX and UI Designer", "08/2020", "present", "New York City, US", "UX and UI Designer Designed and prototyped user interface patterns for various clients in various industries, ranging from self-service apps within the telecommunications sector to mobile games for IOS and Android.");
      const experienceItem2 = new ExperienceItem("Black Mesa Labs", "UX Research Assistant", "04/2018", "02/2019", "Berlin, Germany", "Supported senior researchers on accessibility standards for the open web. Created and usability tested wireframes and prototypes. Produced interactive documentation for quick onboarding of new researchers.");
      setExperienceList([...experienceList, experienceItem, experienceItem2]);
      console.log(experienceItem);
    }
    
  }

  const AddEducationHandler = () => {
    setAddEducation(!addEducation);
    setItemSelected(-1);
    setFormData({
      ...formData,
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: ""
    });
  } 

  const AddExperienceHandler = () => {
    console.log("in addexperiencehandler");
    setAddExperience(!addExperience);
    setExperienceItemSelected(-1);
    setFormData({
      ...formData,
      company: "",
      position: "",
      experienceStartDate: "",
      experienceEndDate: "",
      experienceLocation: "",
      experienceDescription: ""
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEducationItemClick = (event, educationList) => {
    const index = educationList.findIndex(item => item.school === event.target.innerHTML);

    if(index >= 0 && index < educationList.length){
      setFormData({
        ...formData,
        school: educationList[index].school,
        degree: educationList[index].degree,
        startDate: educationList[index].startDate,
        endDate: educationList[index].endDate,
        location: educationList[index].location
      });
    }

    setAddEducation(!addEducation);
    setItemSelected(index);
  }

  const handleExperienceItemClick = (event, experienceList) => {
    const index = experienceList.findIndex(item => item.company === event.target.innerHTML);
    console.log(index);
    if(index >= 0 && index < experienceList.length){
      setFormData({
        ...formData,
        company: experienceList[index].company,
        position: experienceList[index].position,
        experienceStartDate: experienceList[index].startDate,
        experienceEndDate: experienceList[index].endDate,
        experienceLocation: experienceList[index].location,
        experienceDescription: experienceList[index].description
      });
    }

    setAddExperience(!addEducation);
    setExperienceItemSelected(index);
  }

  const SaveButtonHandler = () => {
    console.log("in SaveButtonHandler");
    console.log(itemSelected);
    if (itemSelected < 0) {
      console.log("in -1 case");
      const educationItem = new EducationItem(
        formData.school,
        formData.degree,
        formData.startDate,
        formData.endDate,
        formData.location
      );
      setEducationList([...educationList, educationItem]);
      setAddEducation(false);
    } 
    else {
      console.log("in else case");
      if (itemSelected >= 0 && itemSelected < educationList.length) {
        console.log("in else case if stmt");
        const updatedEducationList = [...educationList];
        updatedEducationList[itemSelected] = {
          ...updatedEducationList[itemSelected],
          school: formData.school,
          degree: formData.degree,
          startDate: formData.startDate,
          endDate: formData.endDate,
          location: formData.location
        };
        setEducationList(updatedEducationList);
      }
  
      setAddEducation(false);
    }
  };

  const SaveExperienceButtonHandler = () => {
    if (experienceItemSelected < 0) {
      const experienceItem = new ExperienceItem(
        formData.company,
        formData.position,
        formData.experienceStartDate,
        formData.experienceEndDate,
        formData.experienceLocation,
        formData.experienceDescription
      );
      setExperienceList([...experienceList, experienceItem]);
      setAddExperience(false);
    } 
    else {
      if (experienceItemSelected >= 0 && experienceItemSelected < experienceList.length) {
        const updatedExperienceList = [...experienceList];
        updatedExperienceList[experienceItemSelected] = {
          ...updatedExperienceList[experienceItemSelected],
          company: formData.company,
          position: formData.position,
          startDate: formData.experienceStartDate,
          endDate: formData.experienceEndDate,
          location: formData.experienceLocation,
          description: formData.experienceDescription
        };
        setExperienceList(updatedExperienceList);
      }
  
      setAddExperience(false);
    }
  };

  const DeleteEducationHandler = () =>{
    if(itemSelected < 0){
      return;
    }

    setEducationList(prevList => {
      const newEducationList = [...prevList];
      newEducationList.splice(itemSelected, 1);
      return newEducationList;
    });

    setAddEducation(!addEducation);
  };

  const DeleteExperienceHandler = () =>{
    console.log("in delete handler");
    if(experienceItemSelected < 0){
      return;
    }

    setExperienceList(prevList => {
      const newExperienceList = [...prevList];
      newExperienceList.splice(experienceItemSelected, 1);
      return newExperienceList;
    });

    setAddExperience(!addExperience);
  };

  const HandleDownload = () => {
    const resumeContainer = resumeContainerRef.current;
    const pdf = new jsPDF('p', 'pt', 'a4');

    const options = {
      scale: 2
    };

    html2canvas(resumeContainer, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.addImage(imgData, 'PNG', 40, 40, imgWidth - 80, imgHeight - 80);
      pdf.save('resume.pdf');
    });
  };

  //functions
  function PrintEducationItems(){
    const educationListMapped = educationList.map((educationItem, index) => (
      <button className="education-item" key={index} onClick={(event) => handleEducationItemClick(event, educationList)}>
        {educationItem.school}
      </button>
    ));

    return (
      <>
        {educationListMapped}
      </>
    )
  }

  function PrintExperienceItems(){
    const experienceListMapped = experienceList.map((experienceItem, index) => (
      <button className="education-item" key={index} onClick={(event) => handleExperienceItemClick(event, experienceList)}>
        {experienceItem.company}
      </button>
    ));

    return (
      <>
        {experienceListMapped}
      </>
    )
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

          <label htmlFor="profile"><b>Profile</b></label>
          <TextArea name="profile" id="profile" rows="5" columns="5" placeholder="Enter Profile Description" onChange={handleInputChange} inputRef={profileInputRef}></TextArea>
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
            <LoadEducationInputs 
              handleInputChange={handleInputChange}
              formData={formData}
              SaveButtonHandler={SaveButtonHandler}
              AddEducationHandler={AddEducationHandler}
              DeleteEducationHandler={DeleteEducationHandler}
            />
          )}
        </div>

        <div className="item-container personal-details-container">
          <p className="title"><b>Experience</b></p>
          {!addExperience && (
            <>
              <PrintExperienceItems />
              <button onClick={AddExperienceHandler}>
                <b>+ Experience</b>
              </button>
            </>
          )}
          {addExperience && (
            <LoadExperienceInputs 
              handleInputChange={handleInputChange}
              formData={formData}
              SaveExperienceButtonHandler={SaveExperienceButtonHandler}
              AddExperienceHandler={AddExperienceHandler}
              DeleteExperienceHandler={DeleteExperienceHandler}
            />
          )}
        </div>
        
        <div className="item-container">
        <button className="download-button" onClick={HandleDownload}>Download Resume</button>
        </div>
      </div>

      <div className="resume-container" ref={resumeContainerRef}>
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

        <div className="main-resume-section">
          <div className="resume-heading">
            Profile
          </div>
          <p className="profile-text">
            {formData.profile && (
              formData.profile
            )}
          </p>

          <div className="resume-heading">
            Education
          </div>
            <div className="education-list-contiainer">
              {educationList.length > 0 && (
                <LoadEducationItemsOnResume
                  educationList={educationList}
                />
              )}
            </div>

            <div className="resume-heading">
              Experience
            </div>

            <div className="education-list-contiainer">
              {experienceList.length > 0 && (
                <LoadExperienceItemsOnResume
                  experienceList={experienceList}
                />
              )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;