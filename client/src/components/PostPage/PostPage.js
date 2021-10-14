import React, { useEffect, useState } from 'react'
import {withRouter} from 'react-router-dom'
import Auth from '../hoc/auth'
import axios from 'axios'

import styled from 'styled-components'
import {Link} from 'react-router-dom'

import {Typography} from 'antd'
const {Title} = Typography
 function PostPage(props) {
   const [post,setPost] = useState([])
   const postId =props.match.params.postId
   useEffect(()=>{

      const variable = {postId:postId}

     axios.post('/api/blog/getPost',variable)  
     .then(response=>{
       if(response.data.success){
         console.log(response.data.post)
         console.log(response.data.post.writer)
        
         setPost(response.data.post)
       } else {
          alert('Failed to get post')
       }
     }
     )
   },[])
    
   if(post.writer){
  return (
    
    <div className="postPage" style={{width:"80%", margin:"3rem auto"}}>
     <BlogNav>
        <Title style={{marginTop:'40px'}}><StyledLink style={{color:"black"}} to="/blog/user" >Diary</StyledLink></Title>
      <Title ><StyledLink style={{color:"rgb(103,0,0)"}} to="/blog/create" >Create Diary</StyledLink></Title>
      </BlogNav>
      <Title>{post.writer.name}'s Post</Title>
      <br />
      <div style={{display: 'flex', justifyContent:"flex-end"}}>
        <Title level={4}>{post.createdAt}</Title>
      </div>
      <div dangerouslySetInnerHTML={{__html:post.content}}/>
    </div>
  )
   }else{
     return (
       <div>
         <h1>Loading...</h1>
       </div>
     )
   }
    
}

export default Auth(withRouter(PostPage),true)


const StyledLink = styled(Link)`
  margin: 0 0 20px 0;
  text-decoration:none;
  font-size:2rem;
  
`
const BlogNav = styled.div`
  display:flex;
  justify-content:space-around;
`