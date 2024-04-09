import "./Navbar.css";
import MenuItems from "./MenuItems";
import { useSelector, useDispatch } from 'react-redux'

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
    // const count = useSelector((state) => state.commonservice.value)
    const showhideDropdown = useSelector((state) => state.commonservice.dropdown)
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
    return (
        <div className={`${showhideDropdown ? "show" : "hide"}`}>
<ul  className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""} `}>
            {submenus.map((submenu, index) => (
                <MenuItems depthLevel={depthLevel} items={submenu} key={index} />
            ))}
        </ul>
        </div>
    );
};

export default Dropdown;