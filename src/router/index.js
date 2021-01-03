import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Logout from '../views/Logout.vue'
import AddPost from '../views/AddPost.vue'
import Post from '../views/Post.vue'
import Categories from '../views/Categories.vue'
import AddCategory from '../views/addCategory.vue'
import Category from '../views/Category.vue'
import EditPost from '../views/Edit.vue'
import Notis from '../views/Notifications.vue'
import Search from '../views/SearchResult.vue'
import Verify from '../views/Verify.vue'
import ForgetPass from '../views/ForgetPass.vue'
import ResetPass from '../views/ResetPass.vue'
import NotFound from '../views/NotFound.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: Profile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/user/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  // {
  //   path: '/addCategory',
  //   name: 'addCategory',
  //   component: AddCategory
  // },
  {
    path: '/categories/:name',
    name: 'Category',
    component: Category
  },
  {
    path: '/posts/edit/:id',
    name: 'EditPost',
    component: EditPost
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notis
  },
  {
    path: '/search-result/:name',
    name: 'SearchResult',
    component: Search
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: ForgetPass
  },
  {
    path: '/reset-password/:hash',
    name: 'ResetPassword',
    component: ResetPass
  },
  {
    path: '*/*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = window.localStorage.getItem('authToken') || null;
  if(isAuthenticated && (to.name == 'Login' || to.name == 'Signup' || to.name == 'Verify' || to.name == 'ForgetPassword' || to.name == 'ResetPassword')){
    next({name: 'Home'})
  } else if (!isAuthenticated && (to.name !== 'Login' || to.name !== 'Signup' || to.name !== 'Verify' || to.name !== 'ForgetPassword' || to.name !== 'ResetPassword')) {
    next()
  } else {
    next();
  }
})


export default router
