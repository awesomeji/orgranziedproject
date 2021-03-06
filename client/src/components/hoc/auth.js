import {useEffect} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {auth} from '../../_actions/user_action'


export default function(SpecificComponent,option,adminRoute=null)  {
  // option = null // pages taht anyone can access
  // true // pages that only loginuser can access
  // false // pages that loginuser can not access
  // adiminRoute = null // pages that only admin can access
  function AuthenticationCheck(props){
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(auth())
      .then(res=>{
        console.log(res)


        //not sign in
        if(!res.payload.isAuth){
          if(option){
            props.history.push('/login')
          }
        }else{
          //sign in state
          if(adminRoute && !res.payload.isAdmin){
            props.history.push('/')
          }else{
            if(option === false){
              props.history.push('/')
            }
          }
        }
      })

      axios.get('/api/users/auth')

    },[])
    return(
      <SpecificComponent {...props}/>
     )
  }


  return AuthenticationCheck
}