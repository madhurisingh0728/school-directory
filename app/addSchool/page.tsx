'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './AddSchoolForm.module.css';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('schoolImage', data.image[0]);
    const { data: imgRes } = await axios.post('/api/upload', formData);
    await axios.post('/api/schools', {
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      contact: data.contact,
      email_id: data.email_id,
      image: imgRes.fileName,
    });
    alert("School added!");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} placeholder="School Name"/>
      {errors.name && <span>Name is required</span>}
      <input {...register('address', { required: true })} placeholder="Address"/>
      <input {...register('city', { required: true })} placeholder="City"/>
      <input {...register('state', { required: true })} placeholder="State"/>
      <input {...register('contact', { required: true })} placeholder="Contact"/>
      <input type="file" {...register('image', { required: true })}/>
      <input {...register('email_id', {
        required: true,
        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      })} placeholder="Email"/>
      {errors.email_id && <span>Valid email required</span>}
      <button type="submit">Add School</button>
    </form>
  );
}
