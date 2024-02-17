
const initialState = {
    datas : [],
    users : "",
}

const DummyDatas = [
    {id:1, name:"Anish Sina", gender:"Male", place:"Chennai",contactNo:"8438438438"},
    {id:2, name:"Vinesh Seniv", gender:"Male", place:"Chennai",contactNo:"9292929292"},
    {id:3, name:"John Doe", gender:"Male", place:"Bangalore",contactNo:"2342232423"},
    {id:4, name:"Jennifer Lawrence", gender:"Female", place:"Goa",contactNo:"1231231231"},
    {id:5, name:"Roman Joe", gender:"Male", place:"Mumbai",contactNo:"9797189145"},
    {id:6, name:"Fathima Begum", gender:"Female", place:"Delhi",contactNo:"9099090999"},
]

const ReducerData = (state = initialState,action)=>{
    switch(action.type){

        case "FETCH_DATA" :
            return {...state, datas: DummyDatas};
        
        case "ADD_DATA" :
            return {...state, datas: [ ...state.datas,action.payload ]};
        
        case "UPDATE_DATA" :
             return {...state, 
                datas:state.datas.map((i)=>
                    i.id === action.payload.id 
                    ? 
                    {...i,
                        name:action.payload.name,
                        gender:action.payload.gender,
                        place:action.payload.place,
                        contactNo:action.payload.contactNo}
                    : i
                )};

        case "DELETE_DATA" :
            return {...state,
                datas: state.datas.filter((del)=>del.id !== action.payload)
            };

        default : return state;
    }
}

export default ReducerData;