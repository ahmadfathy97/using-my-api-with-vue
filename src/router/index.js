import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "Signup" */ '../views/Signup.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "Logout" */ '../views/Logout.vue')
  },
  {
    path: '/user/:id',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue')
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: () => import(/* webpackChunkName: "AddPost" */ '../views/AddPost.vue')
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: () => import(/* webpackChunkName: "Post" */ '../views/Post.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import(/* webpackChunkName: "Categories" */ '../views/Categories.vue')
  },
  // {
  //   path: '/addCategory',
  //   name: 'addCategory',
  //   component: () => import(/* webpackChunkName: "AddCategory" */ '../views/AddCategory.vue')
  // },
  {
    path: '/categories/:name',
    name: 'Category',
    component: () => import(/* webpackChunkName: "Category" */ '../views/Category.vue')
  },
  {
    path: '/posts/edit/:id',
    name: 'EditPost',
    component: () => import(/* webpackChunkName: "Edit" */ '../views/Edit.vue')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import(/* webpackChunkName: "Notifications" */ '../views/Notifications.vue')
  },
  {
    path: '/search-result/:name',
    name: 'SearchResult',
    component: () => import(/* webpackChunkName: "SearchResult" */ '../views/SearchResult.vue')
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import(/* webpackChunkName: "Verify" */ '../views/Verify.vue')
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: () => import(/* webpackChunkName: "ForgetPass" */ '../views/ForgetPass.vue')
  },
  {
    path: '/reset-password/:hash',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "ResetPass" */ '../views/ResetPass.vue')
  },
  {
    path: '*/*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
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
  } else if (!isAuthenticated && (to.name === 'Login' || to.name === 'Signup' || to.name === 'Verify' || to.name === 'ForgetPassword' || to.name === 'ResetPassword' || to.name === 'Home')) {
    next()
  } else if(!isAuthenticated){
    next({name: 'Login'})
  } else {
    next();
  }
})


export default router
