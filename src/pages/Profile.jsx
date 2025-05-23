import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Profile = () => {
  const { userData, setUserData, backendUrl, token, getUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(false);

  const uploadUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('dob', userData.dob);
      formData.append('gender', userData.gender);

      image && formData.append('image', image);
      const { data } = await axios.post(backendUrl + '/api/user/updateData', formData, { headers: { token } });
      console.log("update")
      if (data.success) {
        toast.success(data.message);
        await getUserData();
        setIsEdit(false);
        setImage(false);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return userData && (
    <div className="max-w-lg flex flex-col gap-6 text-sm mt-6 mx-auto p-6 bg-white shadow-xl rounded-lg transition-transform transform hover:shadow-2xl duration-300">
      {/* Profile Picture */}
      {
        isEdit ? (
          <label className="w-36 h-36 rounded-full mx-auto border-4 border-gray-200 shadow-sm hover:shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer" htmlFor="image">
            <div>
              <img className="w-36 h-36 rounded-full mx-auto border-4 border-gray-200 shadow-sm hover:shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              {/* <img className='w-10 absolute bottom-12 right-12 bg-black' src={image?"":uploadIcon} alt="" /> */}
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden /></div>
          </label>

        ) : (
          <img
            className="w-36 h-36 rounded-full mx-auto border-4 border-gray-200 shadow-sm hover:shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
            src={userData.image}
            alt="Profile Picture"
            onClick={() => setIsModalOpen(true)} // Open modal on click
          />

        )
      }

      {isEdit ? (
        <input
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="text-center border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg font-medium transition duration-300 ease-in-out"
          placeholder="Enter your name"
        />
      ) : (
        <p className="text-center text-lg font-semibold text-gray-800 hover:text-blue-500 transition duration-300">
          {userData.name}
        </p>
      )}
      <hr className="my-4 border-gray-300" />
      <div>
        <p className="text-gray-500 font-bold mb-2">Contact Information</p>
        <div className="text-gray-700">
          <p className="font-medium">Email:</p>
          <p className="mb-2 hover:text-blue-500 transition duration-300">
            {userData.email}
          </p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 transition duration-300"
            />
          ) : (
            <p className="mb-2 hover:text-blue-500 transition duration-300">
              {userData.phone}
            </p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div>
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="w-full mb-1 border-b-2 border-gray-300 outline-none focus:border-blue-400 transition duration-300"
                placeholder="Address Line 1"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 transition duration-300"
                placeholder="Address Line 2"
              />
            </div>
          ) : (
            <p className="mb-2 hover:text-blue-500 transition duration-300">
              {userData.address.line1}
              <br />
              {userData.address.line2}
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
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 transition duration-300"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="mb-2 hover:text-blue-500 transition duration-300">
              {userData.gender}
            </p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob ? userData.dob : ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 transition duration-300"
            />

          ) : (
            <p>
              {userData.dob
                ? new Date(userData.dob).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                : ""}
            </p>


          )}
        </div>
      </div>
      <div className="mt-4 mx-auto w-[60%]">
        {isEdit ? (
          <button
            onClick={uploadUserProfileData}
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
              src={userData.image}
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