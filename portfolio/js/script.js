// toggle icon navbar 
let menuIcon=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');
menuIcon.onclick=()=>{
    menuIcon.classList.toggle('bx-x');
   navbar.classList.toggle('active');
}


//scroll sections 
let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('header nav a');
window.onscroll=()=>{
    sections.forEach(sec =>{
        let top=window.scrollY;
        let offset=sec.offsetTop-100;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id');
        if(top>=offset && top<offset+height){
            //active navbar links
            navLinks.forEach(links=>{
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+id+']').classList.add('active');
            });
        }

    });
    let header=document.querySelector('header');
    header.classList.toggle('sticky',window.scrollY > 100);

    // remove toggle incon and navbar when click navbar links(scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    //animation footer on scroll
    let footer=document.querySelector('.footer');
    footer.classList.toggle('show-animate',this.innerHeight+this.screenY>=document.scrollingElement.scrollHeight);

}
const handleSubmit =async (event) => {
    debugger;
  event.preventDefault();
  const fullName = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const subject = document.getElementById('subject').value;
//   const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nSubject: ${subject}`;
//   window.location.href = `mailto:9WlTc@example.com?subject=${subject}&body=${body}`;
const mobileNumber = document.getElementById('mobileNumber').value;
const source="Portfolio";
if(fullName==""||email==""||message==""||subject==""){
  alert("Please fill all the fields");
  return ;
}
if(mobileNumber=="" || mobileNumber.length!=10){
    alert("Please enter a valid mobile number");
    return ;
}
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if(!email.match(emailPattern)){
    alert("Please enter a valid email");
    return ;
}
const res=await fetch("https://onlinehospitalbackend-production.up.railway.app/api/v1/contact",{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
    "Accept":"application/json"
  },
  body:JSON.stringify({
    fullName,
    email,
    message,
    subject,
    mobileNumber,
    source
  })
});
const data=await res.json();
if(!res.ok)
{
    alert(data.error);
    return ;
}
if(res.status==200){
  alert("Your message has been sent successfully, We will get back to you shortly , Your requestId is "+data.data.requestId);
  document.getElementById('name').value="";
  document.getElementById('email').value="";
  document.getElementById('message').value="";
  document.getElementById('subject').value="";
  document.getElementById('mobileNumber').value="";
}else{
  alert(data.error);            
}   
return ;
}