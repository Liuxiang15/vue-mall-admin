/**
 * 存储角色对应的权限数组
 */
const roleToRoute = {
  coustomer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'ProductEdit',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'ProductEdit',
    },
    {
      name: 'Category',
    },
  ],
};

/**
 * 过滤掉没有权限的路由
 * @param {*} routes
 * @param {*} role
 */
export default function getMenuRoute(routes, role) {
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  // 考虑到一级和二级路由
  const resultRoutes = routes.filter((r) => {
    const { children } = r;
    const copy = r;
    // 子路由也进行筛选并重新赋值
    copy.children = children.filter((c) => allowRoutesName.includes(c.name));
    return allowRoutesName.includes(r.name);
  });
  return resultRoutes;
}
