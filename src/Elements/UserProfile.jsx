import React, { useState } from 'react';

const UserProfile = () => {
  // Sample user data (you can replace it with actual user data or fetch it from an API)
  const [user, setUser] = useState({
    id: 1,
    name: 'Betsy',
    breed: 'Jersey',
    address: '123 Main St.',
  });

  // State to manage whether the user is in edit mode or not
  const [editMode, setEditMode] = useState(false);

  // Function to handle edits and updates
  const handleEdit = () => {
    setEditMode(!editMode);
  };

  // Function to handle changes in user details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Cow Information</h1>
      <div>
        <label>Name:</label>{' '}
        {editMode ? (
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        ) : (
          user.name
        )}
      </div>
      <div>
        <label>Breed:</label>{' '}
        {editMode ? (
          <input
            type="text"
            name="breed"
            value={user.breed}
            onChange={handleChange}
          />
        ) : (
          user.breed
        )}
      </div>
      <div>
        <label>Address:</label>{' '}
        {editMode ? (
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        ) : (
          user.address
        )}
      </div>
      <button onClick={handleEdit}>{editMode ? 'Save' : 'Edit'}</button>
    </div>
  );
};

export default UserProfile;
