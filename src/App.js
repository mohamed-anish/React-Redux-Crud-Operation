import './App.css';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addData, deleteData, fetchData, updateData } from './Action';
import { useEffect, useState } from 'react';

function App() {
  const useData = useSelector((i)=> i);
  const [data,setData]=useState([])

  useEffect(()=>{
    setData(useData.datas)
  },[useData.datas])
  const [filterData,setFilterData] = useState("");
  const dispatch = useDispatch();

  const [details,setDetails] = useState(
    {
      name:"",
      gender:"",
      place:"",
      contactNo:"",
    }
  )
  
  const [edit,setEdit] = useState(false)
  useEffect(()=>{
    dispatch(fetchData())
  },[])

  useEffect(()=>{
    if(filterData !== ""){
      const filteredObject = data.filter((item)=> {
        return item.name.toLowerCase().includes(filterData.toLowerCase())}
      );
      setData([...filteredObject])
    }
    else{
      setData([...useData.datas])
    }
  },[filterData])
  return (
    <div className="App">
      <header className="App-header">
        <Row>
        <Col><h2 className='text-primary fw-bold'>Crud Operation Using Redux</h2></Col>
        </Row>
      </header>
      <div>
        <Row className='mb-4 mt-1 mx-0 bg-warning text-start pt-4 pb-2 rounded' >
          <Col>
          <div><label className='fs-5 fw-bold ms-2'>Name <span className='text-danger'>*</span></label></div>
          <input type='text' className='ms-2 rounded-1 ' 
          value={details.name}
          onChange={(e)=>{setDetails({...details,name:e.target.value})}}></input>
          </Col>
          <Col>
          <div><label className='fs-5 fw-bold ms-2'>Gender <span className='text-danger'>*</span></label></div>
          <input type='text' className='ms-2 rounded-1' 
          value={details.gender}
          onChange={(e)=>{setDetails({...details,gender:e.target.value})}}></input>
          </Col>
          <Col>
          <div><label className='fs-5 fw-bold ms-2'>Place <span className='text-danger'>*</span></label></div>
          <input type='text' className='ms-2 rounded-1'
          value={details.place}
          onChange={(e)=>{setDetails({...details,place:e.target.value})}}></input>
          </Col>
          <Col>
          <div><label className='fs-5 fw-bold ms-2'>Contact No <span className='text-danger'>*</span></label></div>
          <input type='text' className='ms-2 rounded-1' 
          value={details.contactNo}
          onChange={(e)=>{setDetails({...details,contactNo:e.target.value})}}></input>
          </Col>
          <Row className='text-center mt-4'>
          <Col>
          <Button variant='primary' className='px-5' onClick={()=>{
            if( details.name !== "" && details.gender !== "" && details.place !== "" && details.contactNo !== ""){
            if(edit){
              dispatch(updateData(details));
              setDetails({id:"",name:"",gender:"",place:"",contactNo:""})
              setEdit(false);
              
            }
            else {
              
            dispatch(addData({...details,id:useData.datas.length + 1}));
            setDetails({name:"",gender:"",place:"",contactNo:""})
          }}
          }}>{edit ? "UPDATE DATA" : "ADD"}</Button>
          </Col>
          </Row>
        </Row>

        <Row className=' bg-warning text-start mx-0 py-3  rounded-top'>
        <Col>
          <label className='fs-5 fw-bold'>Search By Name:</label>
          <input type='text' className='ms-2 rounded-1' 
          onChange={(e)=>{setFilterData(e.target.value)}}></input>
          </Col>
        </Row>

        <Table striped bordered hover  className='text-center'>
          <thead>
          <tr>
            <th>
              S.NO
            </th>
            <th>
              Name
            </th>
            <th>
              Gender
            </th>
            <th>
              Place
            </th>
            <th>
              Contact No
            </th>
            <th>
              Actions
            </th>
          </tr>
          </thead>
          <tbody>

           { data.map((item,index)=>(
                        <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.place}</td>
                        <td>{item.contactNo}</td>
                        <td><Button variant='info' size='md' 
                        onClick={()=>{setEdit(true);
                                      setDetails({id:item.id,name:item.name,gender:item.gender,place:item.place,contactNo:item.contactNo})}
                                      }>Edit</Button>{'  | '}

                              <Button variant='danger' size='md'
                              onClick={()=>dispatch(deleteData(item.id))}
                              >Delete</Button>
                        </td>
                       </tr>

          
           )) 
           }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
