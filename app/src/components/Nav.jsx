import { Menu, Button } from 'antd';
import React from 'react';


export default function Nav() {
   const menuItems = [
        {
            key: 'center',
            label: 'Главная',
        },
        {
          key: 'button',
          icon:  <Button>ОБНОВИТЬ</Button>,
          label: '',
      },
      
    ];
     <Menu items={menuItems} />
    return ( <>
     <Menu mode="horizontal" items={menuItems}/>
    
     </>
    );
  }
  
  

