import React,{useState,useEffect,createContext} from 'react'

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [todos, setTodos] = useState([
      
    ]);

    useEffect(() => {
      const todoStore = JSON.parse(localStorage.getItem('todoStore'))
      if(todoStore) setTodos(todoStore)

    },[])

    useEffect(() => {
      localStorage.setItem('todoStore', JSON.stringify(todos));
    },[todos])


  return (
   <DataContext.Provider value={[todos,setTodos]}>
     {props.children}
   </DataContext.Provider>
    // props.children은 DataProvider가 감싸게 될 태그들 그 태그들이 수정되도 dataprovider는 그대로 유지됨(wrapper)
  )
}
