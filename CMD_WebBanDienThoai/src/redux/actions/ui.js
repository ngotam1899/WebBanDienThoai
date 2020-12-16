export const UIActionTypes = {
    SHOW_LOADING : 'GLOBAL_SHOW_LOADING',
    HIDE_LOADING : 'GLOBAL_HIDE_LOADING',

    SHOW_SIDEBAR : 'SHOW_SIDEBAR',
    HIDE_SIDEBAR : 'HIDE_SIDEBAR',
};

const showLoading = () => ({
  type: UIActionTypes.SHOW_LOADING,
});

const hideLoading = () => ({
  type: UIActionTypes.HIDE_LOADING,
});

const UIActions = {
  showLoading,
  hideLoading,

};

export default UIActions;
