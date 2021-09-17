import React,{useEffect,useState} from 'react'

import Auth from '../hoc/auth'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled,{keyframes} from 'styled-components'
import {EditOutlined,SettingOutlined,ZoomInOutlined,DeleteOutlined} from '@ant-design/icons';
import {Card,Avatar,Col,Typography,Row} from 'antd'
const {Title} = Typography;
const {Meta} = Card;
function BlogPage(props) {
   const [blogs, setBlogs] = useState([])
   const user = useSelector(state=>state.user)//bring user info from redux
   
  // console.log(user.userData._id)
   
   
  

  useEffect(() => {
    
    
    axios.get('/api/blog/getBlogs')
    .then(response => {
      if(response.data.success){
        setBlogs(response.data.blogs)
      } else{
        alert("Couldn't get post list")
      }
    })
  },[])

//function
const renderCard = blogs.map((blog, index) => {
  return <Col key={index} lg={8} md={12} xs={24} >
    <StyledCard 
    hoverable
    style={{width:370, marginTop:16}}
    actions={[
      <EditOutlined />,
      <DeleteOutlined/>,
      <a href={`/blog/post/${blog._id}`}><ZoomInOutlined/></a>,
    ]}
    >
      <Meta
      // avatar={
      //   <Avatar src={blog.writer.image}/>
      // }
      title={blog.writer.name}
      description="This is the description"
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
        <Title style={{marginTop:'40px'}}><StyledLink style={{color:"black"}} to="/blog" >Blog</StyledLink></Title>
      <Title ><StyledLink style={{color:"black"}} to="/blog/create" >Create</StyledLink></Title>
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
  animation: ${appear} 1.5s ease-in-out;
`

const StyledCard = styled(Card)`
animation: ${appear} 1.5s ease-in-out;
`