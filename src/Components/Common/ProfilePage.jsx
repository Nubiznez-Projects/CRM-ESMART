const ProfilePage = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    address: "1234 Elm Street, Springfield, USA",
    profilePic: "https://i.pravatar.cc/150?img=1",
    bio: "Frontend developer passionate about clean UI and great UX.",
  };

  return (
    <div className="h-full bg-gray-100 p-10 font-sans">
      <h1 className="text-4xl font-semibold mb-8 text-gray-900">
        User Profile
      </h1>
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <div className="md:w-1/3 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover mb-6 border-4 border-indigo-600"
          />
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 mt-1">{user.email}</p>
          <p className="text-gray-600 mt-1">{user.phone}</p>
        </div>

        <div className="md:w-2/3 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">
              Address
            </h3>
            <p className="text-gray-700">{user.address}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Bio</h3>
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
