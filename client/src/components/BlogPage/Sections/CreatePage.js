import React,{useState} from 'react'
import axios from 'axios'
import {Typography,Button,Form,message} from 'antd'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Auth from '../../hoc/auth'
import QuillEditor from '../../editor/QuillEditor'
const {Title} = Typography;
 function CreatePage(props) {
//state
  const user = useSelector(state=>state.user)//bring user info from redux

  const [content,setContent] = useState('')
  const [files, setFiles] = useState([])

  const onEditorChange = (value)=>{
    setContent(value);
   
  }

  const onFilesChange =()=>{
    setFiles(files)
  }

  const onSubmit = (e) => {
   
   //bring user info from redux
    if(user.userData && !user.userData.isAuth){
      message.error('Please log in to create a post')
    }
    const variables = {
      content:content,
      writer:user.userData._id
      
    }
    axios.post('/api/blog/createPost',variables)
    .then(response => {
      if(response.data.success){
        message.success('Post created')
        setTimeout(()=>{
          props.history.push('/blog/user')
        },2000)
      }
    })
  }
  return (
    <EditorContainer>
      <div>
        <Title level={2}>Create Page</Title>
      </div>
      <QuillEditor 
    
      placeholder="Spit it"
      onEditorChange={onEditorChange}
      onFilesChange={onFilesChange}
      />
      <Form onFinish={onSubmit}>
        <div>
          <Button
          size="large"
          htmlType="submit"
          onFinish={onSubmit}
          
          >
            submit
          </Button>
        </div>
      </Form>
    </EditorContainer>
  )
}

export default Auth(withRouter(CreatePage),true)

const EditorContainer = styled.div`
  height:100vh;
`