import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";


const breadcrumbNameMap: Record<string, string> = {
  "/competitions": "Соревнования",
  "/datasets": "Датасеты",
};


const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = [
    {
      title: <Link to='/'>Главная страница</Link>
    },
    ...pathSegments.map((segment, index) => {
      const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const label = breadcrumbNameMap[url] || segment.charAt(0).toUpperCase() + segment.slice(1);

      return {
        title: <Link to={url}>{label}</Link>,
      };
    }),
  ];


  return (
    <Breadcrumb items={breadcrumbItems} />
  );
};

export default BreadcrumbNav;