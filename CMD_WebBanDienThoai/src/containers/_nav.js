export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  /* {
    _tag: 'CSidebarNavTitle',
    _children: ['Theme']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  }, */
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý sản phẩm',
    route: '/products',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách sản phẩm',
        to: '/products/product-manage',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách loại sản phẩm',
        to: '/products/category-manage',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách màu',
        to: '/products/color-manage',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách nhóm sản phẩm',
        to: '/products/group-manage',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách thương hiệu',
        to: '/products/brand-manage',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách thuộc tính',
        to: '/products/specification-manage',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý người dùng',
    route: '/users',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách người dùng',
        to: '/users/user-manage',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách đơn hàng',
        to: '/users/order-manage',
      },
    ],
  },
]

