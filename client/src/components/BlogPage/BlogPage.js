import React,{useEffect,useState} from 'react'

import Auth from '../hoc/auth'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled,{keyframes} from 'styled-components'
import {EditOutlined,SettingOutlined,ZoomInOutlined,DeleteOutlined} from '@ant-design/icons';
import {Card,Avatar,Col,Typography,Row,message} from 'antd'
const {Title} = Typography;
const {Meta} = Card;
function BlogPage(props) {
   const [blogs, setBlogs] = useState([])
   const user = useSelector(state=>state.user)//bring user info from redux
   const [userName,setUserName] = useState('')
   
  // console.log(user.userData._id)
   const deletePost = (e) =>{
     
     const variable = {postId:e._id}
     console.log(variable)
      axios.post('/api/blog/delete',variable
      ).then(res=>{
         if(res.data.success){
            message.success('Post Deleted')
            setTimeout(()=>{
              window.location.reload()
            },1000)
         }
      })
   }
   
  

  useEffect(() => {
    if (!user.userData?._id) return;
    const userId = {userId:user.userData._id};
    setUserName(user.userData.name)
    axios.get('/api/blog/getBlogs',userId)
    .then(response => {
      if(response.data.success){
        const blogsInfo = response.data.blogs;
        const fBlogsInfo = blogsInfo.filter(index=>index.writer._id===user.userData._id)
        setBlogs(fBlogsInfo)
      } else{
        alert("Couldn't get post list")
      }
    })
  },[user?.userData?._id])

//function

const renderCard = blogs.map((blog, index) => {
  return <Col  key={index} lg={8} md={12} xs={24} >
    <StyledCard 
    
    hoverable
    style={{width:370, marginTop:16}}
    actions={[
      <EditOutlined style={{fontSize:25}}  />,
      <DeleteOutlined style={{fontSize:25}} onClick={()=>deletePost(blog)}/>,
      <a href={`/blog/post/${blog._id}`}><ZoomInOutlined style={{fontSize:25}}/></a>,
    ]}
    >
      <Meta
      // avatar={
      //   <Avatar src={blog.writer.image}/>
      // }
      title={blog.writer.name}
      description="Preview"
      />
      <div style={{height:150, overflowY: 'scroll', marginTop:10}}>

        <div dangerouslySetInnerHTML={{__html: blog.content}}/>
      </div>
    </StyledCard>
  </Col>
})


  return (
    <div style={{height:'80vh', margin:'0 40px 0 40px'}}>
      <BlogNav>
        {userName}'s Diary
      <Title ><StyledLink style={{  color: "rgb(103, 0, 0)"
}} to="/blog/create" >Create Diary</StyledLink></Title>
      </BlogNav>
      <Row gutter={[32,16]}>
        {renderCard}
        </Row> 
    </div>  
  )
}


export default  Auth(withRouter(BlogPage),true)

const appear = keyframes`
from { opacity: 0; }
to { opacity: 1; }
`
const StyledLink = styled(Link)`
  
  text-decoration:none;
  font-size:2.5rem;
 
  
`
const BlogNav = styled.div`
  display:flex;
  justify-content:space-around;
  margin: 20px 0 20px 0;
  animation: ${appear} 1.5s ease-in-out;
  text-align:center;
  font-size:2.5rem;
  text-shadow: 0px 0px 4px rgb(102, 100, 83);

`

const StyledCard = styled(Card)`
animation: ${appear} 1.5s ease-in-out;

border:none;
color: rgb(0,0,0);
text-shadow: 0px 0px 4px rgb(102, 100, 83);
box-shadow: 0px 0px 8px rgb(77, 75, 63);
background-color: rgba(199, 182 , 153 ,0.5);
background-image: url("https://www.transparenttextures.com/patterns/shattered-dark.png");
border-radius: 2rem;
`