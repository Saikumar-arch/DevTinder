const UserCard = ({ user }) => {

  if (!user) return <h2>Loading...</h2>;  

  const {
    caption,
    fullName,
    profileImage,
    profession,
    organisation,
    skills,
    about,
    
  } = user;

  return (
    <div className="flex-center card bg-sky-900 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={profileImage} alt={fullName} className="rounded-xl" />
      </figure>

      <div className="card-body items-center text-center">
        <h2 className="card-title">{caption}</h2>
        <p>{profession}</p>
        <p>{organisation}</p>
        <p>{skills.join(", ")}</p>
        <p>{about}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Add Friend</button>
          <button className="btn btn-primary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
