import "./Navbar.css";
import MenuItems from "./MenuItems";
const Dropdown = ({ submenus, dropdown, depthLevel }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
            {submenus.map((submenu, index) => (
                <MenuItems depthLevel={depthLevel} items={submenu} key={index} />
            ))}
        </ul>
    );
};

export default Dropdown;