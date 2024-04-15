import { useState } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import styles from '../styles/createpost.module.css';

export default function CreatePost() {
  const [inputs, setInputs] = useState({
    title: '',
    category: '',
    prep_time_mins: 0,
    cook_time_mins: 0,
    servings: 0,
    media: '',
  });

  const [body, setBody] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1,2,3,4,5,6,false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link', 'image'
  ]

  function handleChange(event) {
    setInputs(prevState => {
      return ({
        ...prevState,
        [event.target.name]: event.target.value
      });
    });
  }

  function handleSubmit() {
    return ;
  }

  return (
    <section>
      <div className={styles.create_post}>
        <h2>Create Post</h2>
        <p className={styles.error}>
          This is an error message.
        </p>

        <form className={styles.create_form}>
          <input type="text" name='title' placeholder='Title' value={inputs.title} onChange={handleChange} autoFocus />
          <input type="text" name='category' placeholder='Category' value={inputs.category} onChange={handleChange} />

            <ReactQuill modules={modules} formats={formats} value={body} onChange={setBody}/>

          <p>Prep Time &#40;mins&#41;</p>
          <input type="number" name='prep_time_mins' value={inputs.prep_time_mins} onChange={handleChange} />
          <p>Cook Time &#40;mins&#41;</p>
          <input type="number" name='cook_time_mins' value={inputs.cook_time_mins} onChange={handleChange} />
          <p>Servings</p>
          <input type="number" name='servings' value={inputs.servings} onChange={handleChange} />
          <input type="file" name='media' id='media' onChange={handleChange} accept='png, jpg, jpeg'/>
          <button type='submit' onClick={handleSubmit} className={styles.submit}>Create Post</button>
        </form>
      </div>
    </section>
  );
}