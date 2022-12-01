import { Menu } from 'antd';
import React from 'react';
import { Link } from "react-router-dom";

export default function Nav() {
  const menuItems = [
    {
      key: 'center',
      label: (
        <Link to="/" >
          Главная
        </Link>
      ),
    },
  ];
  <Menu items={menuItems} />
  return (<>
    <div className="header">
      <div><p>Hacker News</p></div>
      <Menu mode="horizontal" items={menuItems} />
    </div>
  </>
  );
}



