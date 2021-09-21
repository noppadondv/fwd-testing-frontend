import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Response } from "../../types";

export interface PlanState {
  data: null | Response;
  gender: string;
  plan: string;
  premiumPerYear: number;
  paymentFrequency: string;
  dob: string | null;
  saPerYear: number;
  status: "idle" | "loading" | "failed";
  error: boolean;
}

const initialState: PlanState = {
  data: null,
  gender: "MALE",
  plan: "T11A20",
  premiumPerYear: 30000,
  paymentFrequency: "YEARLY",
  dob: null,
  saPerYear: 0,
  status: "idle",
  error: false,
};

export const calculatePlan = createAsyncThunk(
  "plan/fetchplan",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { dob, gender, paymentFrequency, premiumPerYear, plan, saPerYear } =
        state.plan;

      const params = {
        genderCd: gender,
        dob: dob,
        planCode: plan,
        premiumPerYear: premiumPerYear,
        paymentFrequency: paymentFrequency,
      };

      if (Number(saPerYear) > 0) {
        Object.assign(params, {
          saPerYear: saPerYear,
        });
      }

      const res = await axios.get("http://localhost:4200/getProduct", {
        params,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const PlanSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setGender(state, actions: PayloadAction<string>) {
      state.gender = actions.payload;
    },
    setPlan(state, actions: PayloadAction<string>) {
      state.plan = actions.payload;
    },
    setPremiumPerYear(state, actions: PayloadAction<number>) {
      state.premiumPerYear = actions.payload;
    },
    setPaymentFrequency(state, actions: PayloadAction<string>) {
      state.paymentFrequency = actions.payload;
    },
    setDob(state, actions: PayloadAction<string>) {
      state.dob = actions.payload;
    },
    setSaPerYear(state, actions: PayloadAction<number>) {
      state.saPerYear = actions.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(calculatePlan.pending, (state) => {
        state.status = "loading";
        state.error = false;
      })
      .addCase(calculatePlan.fulfilled, (state, actions) => {
        state.data = actions.payload;
        state.status = "idle";
      })
      .addCase(calculatePlan.rejected, (state) => {
        state.status = "idle";
        state.error = true;
      });
  },
});

export const {
  setGender,
  setPlan,
  setPremiumPerYear,
  setPaymentFrequency,
  setDob,
  setSaPerYear,
} = PlanSlice.actions;

export const selectPlan = (state: RootState) => state.plan;

export default PlanSlice.reducer;
