import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets_admin/assets.js';
import { AdminContext } from '../../context/AdminContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddMedicine = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Homeopathic');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [medImg, setMedImg] = useState(false);

  const { atoken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!medImg) return toast.error('Please upload medicine image');

      const formData = new FormData();
      formData.append('image', medImg);
      formData.append('name', name);
      formData.append('brand', brand);
      formData.append('category', category);
      formData.append('price', Number(price));
      formData.append('stock', Number(stock));
      formData.append('description', description);

      const { data } = await axios.post(`${backendUrl}/api/admin/add-medicine`, formData, {
        headers: { atoken },
      });

      if (data.success) {
        setName('');
        setBrand('');
        setCategory('Homeopathic');
        setPrice('');
        setStock('');
        setDescription('');
        setMedImg(false);
        scrollTo(0, 0);
        return toast.success(data.message);
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-4 text-lg font-medium'>Add Medicine</p>

      <div className='bg-white rounded w-full p-8 max-h-[80vh] overflow-y-scroll'>

        <div className='flex items-center gap-4 mb-9 text-gray-500'>
          <label htmlFor="med-img">
            <img className='cursor-pointer w-16 h-16 object-cover rounded-full bg-gray-300' src={medImg ? URL.createObjectURL(medImg) : assets.upload_area} alt="Upload Area" />
          </label>
          <input onChange={(e) => setMedImg(e.target.files[0])} type="file" id="med-img" hidden />
          <p>Upload medicine <br /> image</p>
        </div>

        <div className='flex lg:flex-row flex-col items-start gap-10 w-full'>
          <div className='w-full lg:flex-1 flex flex-col'>

            <div className='flex flex-col gap-1 my-4 w-full'>
              <label htmlFor="">Medicine Name:</label>
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='e.g. Aconite 200' required className='border border-gray-300 rounded-md p-2 max-w-[450px] w-full focus:outline-none focus:border-blue-500' />
            </div>

            <div className='flex flex-col gap-1 my-4 w-full'>
              <label htmlFor="">Brand:</label>
              <input onChange={(e) => setBrand(e.target.value)} value={brand} type="text" placeholder='e.g. SBL, Schwabe' required className='border border-gray-300 rounded-md p-2 max-w-[450px] w-full focus:outline-none focus:border-blue-500' />
            </div>

            <div className='flex flex-col gap-1 my-4 w-full'>
              <label htmlFor="">Price (₹):</label>
              <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='e.g. 120' required className='border border-gray-300 rounded-md p-2 max-w-[450px] w-full focus:outline-none focus:border-blue-500' />
            </div>

            <div className='flex flex-col gap-1 my-4 w-full'>
              <label htmlFor="">Stock Quantity:</label>
              <input onChange={(e) => setStock(e.target.value)} value={stock} type="number" placeholder='e.g. 50' required className='border border-gray-300 rounded-md p-2 max-w-[450px] w-full focus:outline-none focus:border-blue-500' />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col'>

            <div className='flex flex-col gap-1 my-4 w-full'>
              <label htmlFor="">Category:</label>
              <select onChange={(e) => setCategory(e.target.value)} value={category} className='border border-gray-300 rounded-md p-2 max-w-[450px] w-full focus:outline-none focus:border-blue-500'>
                <option value="Homeopathic">Homeopathic</option>
                <option value="Allopathic">Allopathic</option>
                <option value="Ayurvedic">Ayurvedic</option>
                <option value="Supplements">Supplements</option>
              </select>
            </div>

            <div className='flex flex-col gap-1 my-4 w-full'>
              <label htmlFor="">Description:</label>
              <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Write about this medicine...' rows={5} required className='border border-gray-300 rounded-md p-2 w-full max-w-[450px] focus:outline-none focus:border-blue-500'></textarea>
            </div>

          </div>
        </div>

        <button className='mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-400 w-full md:w-auto'>
          Add Medicine
        </button>
      </div>
    </form>
  );
};

export default AddMedicine;
