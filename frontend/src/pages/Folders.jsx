import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { getFolders } from '../context/folderService';

const Folder = () => {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");

  // Replace this with actual auth token logic if needed
 const token = localStorage.getItem("token");
  //console.log("Token:", token);
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2IyNjU1NDVjZTc2OWI2YzBiZGFiOCIsImlhdCI6MTc1MjkyMjQ1MCwiZXhwIjoxNzUzMDA4ODUwfQ.WmTNDwqmYa73SFaTc8gnDmge4D2D0HGbPcht5gJ_t04"
  // Fetch folders
    const userId = JSON.parse(localStorage.getItem("user")).id;
    console.log("User ID:", userId);
  const fetchFolders = async () => {
    try {
      const res = await getFolders({userId});
      console.log("Fetched folders:", res);

      setFolders(res);
    } catch (err) {
      toast.error("Failed to load folders");
      console.error(err);
    }
  };

  // Create folder
  const handleCreateFolder = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/folder/createfolder",
        { name: folderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Folder Created");
      setFolderName("");
      fetchFolders(); // Refresh folder list
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error creating folder");
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">📁 Your Folders</h1>

      <form onSubmit={handleCreateFolder} className="mb-6 flex gap-2">
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="New Folder Name"
          className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Folder
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {folders.map((folder) => (
          <div
            key={folder._id}
            className="p-4 bg-gray-800 rounded shadow-md hover:bg-gray-700 cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{folder.name}</h2>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Folder;
