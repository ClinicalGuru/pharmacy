import { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import { MenuItemWrapper } from "./TopMenu.styles";
const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);
    const [activeId, setActiveId] = useState('purchages')
    const navigate = useNavigate();
    let ref = useRef();
    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const clickHandler = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };
    const onNavigate = (item) => {
        navigate(`${item?.url}`);
        setDropdown(false);
    }
    return (
        <li className="menu-items" ref={ref}
            onClick={clickHandler}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
        >
            {items?.submenu ? (
                <>
                    <button
                        className={`${items.id === activeId ? 'active' : ''}`}
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => { setDropdown((prev) => !prev); setActiveId(items?.id); console.log(activeId, 'activeId') }}
                        type="button" aria-haspopup="menu">
                        {items.title}{' '}
                        {depthLevel > 0 ? <span>&raquo;</span> : <ExpandMoreIcon />}
                    </button>
                    <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
                </>
            ) : (
                <MenuItemWrapper onClick={() => onNavigate(items)}>{items.title}</MenuItemWrapper>
            )}
        </li>
    );
};

export default MenuItems;