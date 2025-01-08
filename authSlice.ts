import { createSlice } from "@reduxjs/toolkit";
import TokenService from "../../axios/tokenservice";

import {
  changePassword,
  forgotPassword,
  forgotPasswordComplete,
  getMyDetail,
  getTimezoneList,
  login,
  logout,
  register,
  registerByAdmin,
  resendVerificationEmail,
  updateUserDetail,
  verifyEmail,
} from "./authThunk";

export interface AuthInitialState {
  isLoading: boolean;
  token: Record<string, string> | null;
  currentUser: Record<string, any> | null;
  isAuthenticated: boolean;
  isPasswordResetTokenVerified: boolean;
  isPasswordResetDone: boolean;
  timezonesList: Array<string>;
}

const authInitialState: AuthInitialState = {
  isLoading: false,
  token: TokenService.getToken(),
  currentUser: TokenService.getCurrentUser(),
  isAuthenticated: Boolean(TokenService.getLocalAccessToken()),
  isPasswordResetTokenVerified: false,
  isPasswordResetDone: false,
  timezonesList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // For login
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data;
        state.isAuthenticated = true;
        // Set localstorage
        TokenService.setToken(action.payload.data);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      });

    // For email verification
    builder
      .addCase(verifyEmail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
      });

    // For registration
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
      });

    //For registration by admin

    builder
      .addCase(registerByAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registerByAdmin.rejected, (state, action) => {
        state.isLoading = false;
      });

    // For forgotPassword
    builder
      .addCase(forgotPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
      });

    // For changePassword
    builder
      .addCase(changePassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
      });

    // For forgotPassword token check
    // builder
    //   .addCase(forgotPasswordTokenCheck.pending, (state, action) => {
    //     state.isLoading = true;
    //     state.isPasswordResetTokenVerified = false;
    //   })
    //   .addCase(forgotPasswordTokenCheck.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isPasswordResetTokenVerified = true;
    //   })
    //   .addCase(forgotPasswordTokenCheck.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isPasswordResetTokenVerified = false;
    //   });

    // For forgotPassword complete
    builder
      .addCase(forgotPasswordComplete.pending, (state, action) => {
        state.isLoading = true;
        state.isPasswordResetDone = false;
      })
      .addCase(forgotPasswordComplete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isPasswordResetDone = true;
      })
      .addCase(forgotPasswordComplete.rejected, (state, action) => {
        state.isLoading = false;
        state.isPasswordResetDone = false;
      });

    // For resend verification email
    builder
      .addCase(resendVerificationEmail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
      });

    // For logout
    builder
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
        state.currentUser = null;
        state.token = null;
        state.isAuthenticated = false;
        // Set localstorage
        TokenService.removeCurrentUser();
        TokenService.removeToken();
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.clear();
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
      });

    // For User details
    builder
      .addCase(getMyDetail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMyDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.data;
        TokenService.setCurrentUser(action.payload.data);
      })
      .addCase(getMyDetail.rejected, (state, action) => {
        state.isLoading = false;
      });

    // For Updating User details
    builder
      .addCase(updateUserDetail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUserDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.data;
        TokenService.setCurrentUser(action.payload.data);
      })
      .addCase(updateUserDetail.rejected, (state, action) => {
        state.isLoading = false;
      });

    // For getting timezone
    builder
      .addCase(getTimezoneList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTimezoneList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timezonesList = action.payload.data?.time_zone_choices;
      })
      .addCase(getTimezoneList.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice;
