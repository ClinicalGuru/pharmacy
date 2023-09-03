import { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Dropdown from './Dropdown';

const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);
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
    return (
        <li className="menu-items" ref={ref}
            onClick={clickHandler}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
        >
            {items?.submenu ? (
                <>
                    <button
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => setDropdown((prev) => !prev)}
                        type="button" aria-haspopup="menu">
                        {items.title}{' '}
                        {depthLevel > 0 ? <span>&raquo;</span> : <ExpandMoreIcon />}
                    </button>
                    <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
                </>
            ) : (
                <a href={items.url}>{items.title}</a>
            )}
        </li>
    );
};

export default MenuItems;