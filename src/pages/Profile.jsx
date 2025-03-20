import React, { useState } from 'react';

const Profile = () => {
  // State for user profile
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'A passionate community member who loves to connect and share ideas.',
    profilePicture: 'https://via.placeholder.com/150',
    location: '',
    society: '',
  });

  // State for settings
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'en',
  });

  // State for editing profile
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes for profile
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for settings
  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle location access request
  const requestLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUser((prev) => ({
            ...prev,
            location: `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`,
          }));
          alert('Location access granted!');
        },
        (error) => {
          alert('Unable to retrieve location. Please enable location access in your browser settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Handle society selection
  const handleSocietyChange = (e) => {
    setUser((prev) => ({
      ...prev,
      society: e.target.value,
    }));
  };

  // Save profile changes
  const saveProfileChanges = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600">Manage your profile and settings here.</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Details</h2>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="hidden"
                id="profilePictureUpload"
              />
              <label
                htmlFor="profilePictureUpload"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Change Photo
              </label>
            </div>

            {/* Profile Form */}
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={user.bio}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Location</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="location"
                      value={user.location}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                    <button
                      onClick={requestLocationAccess}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Request Access
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Society</label>
                  <select
                    name="society"
                    value={user.society}
                    onChange={handleSocietyChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!isEditing}
                  >
                    <option value="">Select Society</option>
                    <option value="society1">Society 1</option>
                    <option value="society2">Society 2</option>
                    <option value="society3">Society 3</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                {isEditing ? (
                  <button
                    onClick={saveProfileChanges}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Theme</label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleSettingsChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Notifications</label>
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleSettingsChange}
                className="w-5 h-5"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Language</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleSettingsChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;