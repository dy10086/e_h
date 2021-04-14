import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const AdminLogin = () => import('@/views/adminLogin/adminLogin')
const Home = () => import('@/views/home/home')

const HomeData = () => import('@/views/home/childViews/homeData/data')

const AdminData = () => import('@/views/home/childViews/data/adminData/adminData')
const UserData = () => import('@/views/home/childViews/data/userData/userData')
const ShopData = () => import('@/views/home/childViews/data/shopData/shopData')
const OrderData = () => import('@/views/home/childViews/data/orderData/orderData')

const AddShops = () => import('@/views/home/childViews/addData/addShops/addShops')
const AddGoods = () => import('@/views/home/childViews/addData/addGoods/addGoods')

const routes = [
  {
    path:'/',
    component:AdminLogin,
  },
  {
    path:'/home',
    component:Home,
    redirect:'/homedata',
    children:[
      {
        path:'/homedata',
        component:HomeData
      },
      {
        path:'/admindata',
        component:AdminData
      },
      {
        path:'/userdata',
        component:UserData
      },
      {
        path:'/shopdata',
        component:ShopData
      },
      {
        path:'/orderdata',
        component:OrderData
      },
      {
        path:'/addshops',
        component:AddShops
      },
      {
        path:'/addgoods',
        component:AddGoods
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to,from,next) => {

  if(to.fullPath === '/') return next()
  if(window.localStorage.getItem('token')) return next()

  Vue.prototype.$message.error('当前还未登录')
  next('/')

})

export default router
