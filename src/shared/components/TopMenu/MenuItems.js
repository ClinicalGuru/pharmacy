import { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import { MenuItemWrapper } from "./TopMenu.styles";
import { useSelector, useDispatch } from 'react-redux';
import { showDropdown,hideDropdown } from "../../services/redux/commonservice";
const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);
    const [activeId, setActiveId] = useState('purchages')
    const showhideDropdown = useSelector((state) => state.commonservice.dropdown)
    const dispatch = useDispatch()
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
    const onNavigate = (item, event) => {
        dispatch(hideDropdown());
        console.log("Navigating to:", item?.url);
        navigate(`${item?.url}`); 
        setDropdown(false);
        console.log("Dropdown closed");
        event.stopPropagation();
    };
    function bropdownBorder(item,event)
    {
        if (item.title != "Purchase report") {
        let dsb =  document.getElementsByClassName("dropdown-selected-border")
        if(dsb[0]){
            for(let i=0;i<dsb.length;i++)
            {
                if(dsb[i].classList.value.includes(item.title)){ dsb[i].style.borderBottom = "3px solid gray" }
                else{ dsb[i].style.borderBottom = "3px solid transparent" }
            }
        }
    }
    }
    return (
        <li className="menu-items" ref={ref}
            onClick={clickHandler}
        >
            {items?.submenu ? (
                <>
                    <button
                        className={`${items.id === activeId ? 'active' : ''}`}
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={(event) => { setDropdown((prev) => !prev); bropdownBorder(items,event); dispatch(showDropdown()); setActiveId(items?.id); console.log(activeId, 'activeId') }}
                        type="button" aria-haspopup="menu">
                        {items.title}{' '}
                        {depthLevel > 0 ? <span>&raquo;</span> : <ExpandMoreIcon />}
                    </button>
                    <div className={`${items.title} dropdown-selected-border`}></div>
                    <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
                </>
            ) : (
                showhideDropdown &&
                <MenuItemWrapper  onClick={(event) => onNavigate(items, event)} >{items.title}</MenuItemWrapper>
            )}
        </li>
    );
};

export default MenuItems;