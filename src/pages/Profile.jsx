import React, { useState } from 'react';
import { assets } from './../assets/assets_frontend/assets';

const Profile = () => {
  const [userDate, setUserData] = useState({
    name: 'Edward Vincent',
    image: assets.profile_pic,
    Email: 'richardjameswap@gmail.com',
    Phone: '+1  123 456 7890',
    Address: {
      line1: '57th Cross, Richmond ',
      line2: 'Circle, Church Road, London',
    },
    Gender: 'Male',
    DOB: '2024-02-10',
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-lg flex flex-col gap-6 text-sm mt-6 mx-auto p-6 bg-white shadow-xl rounded-lg transition-transform transform hover:shadow-2xl duration-300">
      {/* Profile Picture */}
      <img
        className="w-36 h-36 rounded-full mx-auto border-4 border-gray-200 shadow-sm hover:shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
        src={userDate.image}
        alt="Profile Picture"
        onClick={() => setIsModalOpen(true)} // Open modal on click
      />
      {isEdit ? (
        <input
          type="text"
          value={userDate.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="text-center border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg font-medium transition duration-300 ease-in-out"
          placeholder="Enter your name"
        />
      ) : (
        <p className="text-center text-lg font-semibold text-gray-800 hover:text-blue-500 transition duration-300">
          {userDate.name}
        </p>
      )}
      <hr className="my-4 border-gray-300" />
      <div>
        <p className="text-gray-500 font-bold mb-2">Contact Information</p>
        <div className="text-gray-700">
          <p className="font-medium">Email:</p>
          <p className="mb-2 hover:text-blue-500 transition duration-300">
            {userDate.Email}
          </p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userDate.Phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, Phone: e.target.value }))
              }
              className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 transition duration-300"
            />
          ) : (
            <p className="mb-2 hover:text-blue-500 transition duration-300">
              {userDate.Phone}
            </p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div>
              <input
                type="text"
                value={userDate.Address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    Address: { ...prev.Address, line1: e.target.value },
                  }))
                }
                className="w-full mb-1 border-b-2 border-gray-300 outline-none focus:border-blue-400 transition duration-300"
                placeholder="Address Line 1"
              />
              <input
                type="text"
                value={userDate.Address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    Address: { ...prev.Address, line2: e.target.value },
                  }))
                }
                className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 transition duration-300"
                placeholder="Address Line 2"
              />
            </div>
          ) : (
            <p className="mb-2 hover:text-blue-500 transition duration-300">
              {userDate.Address.line1}
              <br />
              {userDate.Address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-gray-500 font-bold mb-2">Basic Information</p>
        <div className="text-gray-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              value={userDate.Gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, Gender: e.target.value }))
              }
              className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 transition duration-300"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="mb-2 hover:text-blue-500 transition duration-300">
              {userDate.Gender}
            </p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={userDate.DOB}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, DOB: e.target.value }))
              }
              className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 transition duration-300"
            />
          ) : (
            <p>{userDate.DOB}</p>
          )}
        </div>
      </div>
      <div className="mt-4 mx-auto w-[60%]">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="w-full bg-green-500 text-white py-3 text-lg rounded-lg hover:bg-green-600 transition-transform duration-300 shadow-md"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="w-full bg-teal-500 text-white py-3 text-lg rounded-lg hover:bg-teal-600 transition-transform duration-300 shadow-md"
          >
            Edit
          </button>
        )}
      </div>

      {/* Modal for Viewing Profile Picture */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm">
            <img
              className="w-full rounded-lg"
              src={userDate.image}
              alt="Profile"
            />
            <button
              className="mt-4 w-full bg-red-500 text-white py-3 text-lg rounded-lg hover:bg-red-600 transition"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;