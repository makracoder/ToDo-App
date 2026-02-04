
function Profile() {
    //const name = "Thapa Technical";
    //const age = 26;
    return (
        <div>
            <h1>Profile Component</h1>  
            <ProfileCard 
            name="Adi"
             age={21} />
            
        </div>
    );
}


function ProfileCard(props) {
    return (
        <>
        <h2>Name : {props.name}</h2>
        <p> Age : {props.age}</p>
        </>
    );
}
export default Profile;