export interface SharedState {
  showLoading: boolean;
  errorMessage: string;
  isError: boolean;
}

export const initialState: SharedState = {
  showLoading: false,
  errorMessage: '',
  isError: false
};
