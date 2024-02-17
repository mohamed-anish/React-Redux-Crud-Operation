export const fetchData  = ()=> ({
    type: "FETCH_DATA"
});

export const addData  = (payload)=> ({
    type: "ADD_DATA",
    payload,
});

export const updateData  = (payload)=> ({
    type: "UPDATE_DATA",
    payload,
});

export const deleteData  = (payload)=> ({
    type: "DELETE_DATA",
    payload,
});