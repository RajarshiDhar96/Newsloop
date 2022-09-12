import React,{useEffect, useState} from 'react'
import {convertToRaw, EditorState} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Layout from '../components/Layout';
import axios from 'axios'
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function AddNews()
{
    //In the editorState we will have the content what we have written in the editor
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const[loading,setLoading]=useState(false)
    const user=JSON.parse(localStorage.getItem('newsloop-user'))
    useEffect(()=>{

        console.log(convertToRaw(editorState.getCurrentContent()));

    },[editorState])
    const navigate=useNavigate();
    const save=async()=>{
        setLoading(true)
        try{
          
            const payload={
                title,
                description,
                content:JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                postedBy:{
                    userid:user._id,
                    email:user.email
                    
                }
            };
            await axios.post('/api/newsitems/addnewsitem',payload)
            setLoading(false)
            toast('News added Successfully !!','success')
            navigate('/home')
        }
        catch(error)
        {
            console.log(error);
            toast('News adding failed !!','error')
            setLoading(false)
        }
    }
    return(
        <Layout>
            {loading && <Spinner />}
            <h1 className='text-2xl font-semibold mt-5 ml-5'>Add News</h1>
            <div className='px-5 py-5'>
                <input 
                    value={title} 
                    onChange={(e)=>setTitle(e.target.value)} 
                    type="text" 
                    className='border-2 h-10 w-full border-gray-300 px-5' 
                    placeholder='Title'
                />


                <textarea
                     value={description} 
                     onChange={(e)=>setDescription(e.target.value)} 
                     className='border-2  w-full border-gray-300 my-2 px-5'  
                     rows='4' 
                     placeholder='Description' 
                 />

            </div>
            <div className=' border-2 border-gray-400 mx-5 rounded px-2'> 
                 <Editor editorState={editorState} onEditorStateChange={setEditorState} editorClassName='draft-editor' />
            </div>
            <div className='flex justify-end space-x-5 pr-5 mt-5'>
                <button className='px-5 py-1 bg-red-700 rounded text-sm text-white' onClick={()=>navigate('/home')}>BACK</button>
                <button className='px-5 py-1 bg-green-700 rounded text-sm text-white o' onClick={save}>SAVE</button>
            </div>
           
        </Layout>
    )
}

export default AddNews;