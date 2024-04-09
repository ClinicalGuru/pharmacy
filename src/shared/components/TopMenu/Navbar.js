import React from "react"
import { menuItems } from '../../services/menuItems';
import MenuItems from './MenuItems';


export const Navbar = () => {
    return (
        <nav className="dorpdownList">
            <ul className="menus">
                {menuItems.map((menu, index) => {
                    const depthLevel = 0;
                    return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
                })}
            </ul>
        </nav>
    );
}