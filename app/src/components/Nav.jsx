import { Menu, Button } from 'antd';
import React from 'react';
import {
  Link
} from "react-router-dom";

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
    return ( <>
     <Menu mode="horizontal" items={menuItems}/>
    
     </>
    );
  }
  
  

