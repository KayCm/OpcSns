import { createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    avatar: null,
    phone: null,
    email: null,
    apple_email: null,
    apple_id: null,
    google_email: null,
    google_id: null,
    name: null,
    uuid: null,
    token: null,
  },
  appData: {
    language: 0, // 1 eng,2 spa,3 kr,4 jp,5 zh-tw
  },
};

const particleSlice = createSlice({
    name: 'opcUser',
    initialState:initialState,
    reducers: {
        login: (state,param) => {
            const { payload } = param;
            state.userInfo.avatar = payload?.avatar;
            state.userInfo.phone = payload?.phone;
            state.userInfo.email = payload?.email;
            state.userInfo.apple_email = payload?.apple_email;
            state.userInfo.apple_id = payload?.apple_id;
            state.userInfo.google_email = payload?.google_email;
            state.userInfo.google_id = payload?.google_id;
            state.userInfo.name = payload?.name;
            state.userInfo.token = payload?.token;
            state.userInfo.uuid = payload?.uuid;

            return state;
        },
        updateLanguage:(state,param)=>{
            const { payload } = param;
            state.appData.language = payload?.language;
            return state;
        },
        loginClear: (state) => {
            state.particleUserInfo = initialState.particleUserInfo;
            return state
        },
        appData_trendList_update:(state,param)=>{
            const {payload} = param
            state.appData.trendingList = payload?.trendingList
        }
    },
});

export const { login,
    loginClear,
    updateLanguage,
    appData_trendList_update} = particleSlice.actions;

export const particleState = (state) => state;


export const particleSliceReducer = particleSlice.reducer;
