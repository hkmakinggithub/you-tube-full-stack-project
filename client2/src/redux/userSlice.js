import { createSlice,  } from '@reduxjs/toolkit'


// eslint-disable-next-line no-unused-vars
const initialState  ={
    currentuser:0,
    loding:false,
    error:false
}


export const userSlice = createSlice({
    name: 'counter',
    initialState: {
      value: 0
    },
    reducers: {
    loginstart:(state)=>{
        state.loding=true;
    }
    ,loginSuccess:(state,action)=>{
        state.currentuser=action.payload;
    },
    loginFailure:(state)=>{
        state.loding=false;
        state.error=true;
  },
  logout:(state)=>{
     state.currentuser=0;
     state.loding=false;
     state.error=false;

  },
  Subscription: (state, action) => {
    if (!state.currentuser.subscribedUsers.includes(action.payload)) {
        state.currentuser.subscribedUsers.splice(
        state.currentuser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
         ),1 );
        }
        else{
            state.currentuser.subscribedUsers.puch(action.payload)
        }
        }
         }
});
export const { loginstart,loginSuccess,loginFailure,logout ,Subscription  } = userSlice.actions
export default userSlice.reducer
