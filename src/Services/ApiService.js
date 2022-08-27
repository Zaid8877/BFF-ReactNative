const auth = {
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword:'/auth/forgot_password',
  verifyOTP:'/auth/verify_otp',
  updatePasswordByOTP:'/auth/update_passwoed_by_otp',
  updatePasswordByEmail:'/auth/update_pasword_by_email',
  registerDevice:'/auth/register_device',
  logout:'/auth/logout',
};

const user= {
  getUserById:'/user/get_user_by_id',
  updateUserProfile:'/user/update_user',

}

const contact= {
  addContact:'/user_contact/add',
  deleteContact:'/user_contact/delete',///{id}',
  geAllContact:'/user_contact/get_my_all_contacts',//?page_no=1&page_size=10',
}
const channels={
  getAllMyChannels:'/channel/get_my_all_channels',//?page_no=1&page_size=10
  getChannelDetail:'/channel/get_by_id',//?page_no=1&page_size=10
  create:'/channel/create',
  update:'/channel/update',
  delete:'channel/delete',///{id}
}
const aggora = {
  getToken:'/aggora/get_token', //channel_name=test
  getTokenAndPush:'/agora/generate_token_and_send_push' //channel_name=test
}
export default {
  auth,
  user,
  contact,
  channels,
  aggora,
};
