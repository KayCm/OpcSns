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
    nickname: null,
    username:null,
    uuid: null,
    token: null,
  },
  appData: {
    language: 0, // 1 eng,2 spa,3 kr,4 jp,5 zh-tw
    token:null
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
            state.userInfo.username = payload?.username;
            state.userInfo.token = payload?.token;
            state.userInfo.uuid = payload?.uuid;
            return state;
        },
        updateUserInfo: (state,param) => {
            const { payload } = param;
            state.userInfo.avatar = payload?.avatar;
            state.userInfo.phone = payload?.phone;
            state.userInfo.email = payload?.email;
            state.userInfo.apple_email = payload?.apple_email;
            state.userInfo.apple_id = payload?.apple_id;
            state.userInfo.google_email = payload?.google_email;
            state.userInfo.google_id = payload?.google_id;
            state.userInfo.nickname = payload?.nickname;
            state.userInfo.username = payload?.username;
            state.userInfo.token = payload?.token;
            state.userInfo.uuid = payload?.uuid;
            return state;
        },
        updateToken: (state,param) => {
            console.log('param:',param)
            const { payload } = param;
            state.appData.token = payload?.token;
        },
        updateLanguage:(state,param)=>{
            const { payload } = param;
            state.appData.language = payload?.language;
            return state;
        },
        logout: (state) => {
            state.userInfo = initialState.userInfo;
            state.appData = initialState.appData;
            return state
        },
        appData_trendList_update:(state,param)=>{
            const {payload} = param
            state.appData.trendingList = payload?.trendingList
        }
    },
});

export const { login,
    logout,
    updateLanguage,
    updateToken,
    updateUserInfo,
    appData_trendList_update} = particleSlice.actions;

export const particleState = (state) => state;


export const particleSliceReducer = particleSlice.reducer;
