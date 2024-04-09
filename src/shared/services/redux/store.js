import { configureStore } from '@reduxjs/toolkit';
import {commonserviceReducer} from "../redux/commonservice";

export default configureStore({
  reducer: {
    commonservice: commonserviceReducer,
  },
});