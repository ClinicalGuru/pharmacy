import React, { useEffect, useState } from "react"
// import { menuItems } from '../../services/menuItems';
// import MenuItems from './MenuItems';
import { motion } from "framer-motion";
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Navbar = (props) => {
    const { navLinksData } = props;
    const [showSubMenu, setShowSubMenu] = useState([]);
    const [activeId, setActiveId] = useState(13);
    const navigate = useNavigate();
    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    };

    const subMenuOnMouseEnterHandler = (subMenu) => {
        setShowSubMenu((prev) => {
            let arr = [...prev];
            arr[subMenu?.id] = true;
            return arr;
        });
    };
    const subMenuOnMouseLeaveHandler = (subMenu) => {
        setShowSubMenu((prev) => {
            let arr = [...prev];
            arr[subMenu?.id] = false;
            return arr;
        });
    };
    const onNavigate = (item, event, el) => {
        setActiveId(el?.id)
        navigate(`${item?.url}`);
        event.stopPropagation();
    };
    return (
        <nav>
            <ul className='main-nav'>
                {navLinksData.map((el, i) => {
                    if (!el.children) {
                        return (
                            <li key={el.id}>
                                <button className='header-nav-link'>
                                    <span>{el.name}</span>
                                </button>
                            </li>
                        );
                    }

                    return (
                        <li
                            onMouseEnter={(event) => subMenuOnMouseEnterHandler(el)}
                            onMouseLeave={(event) => subMenuOnMouseLeaveHandler(el)}
                            key={el.id}
                            className={`${activeId === el?.id ? 'active ': ''}header-nav-options options-hover` }

                        >
                            <div className='header-nav-div'>
                                <span>{el.name} <><KeyboardArrowDownIcon /></></span>
                            </div>
                            <motion.ul
                                variants={variants}
                                animate={showSubMenu[el.id] ? "open" : "closed"}
                                className='header-nav-ul'
                            >
                                {showSubMenu[el.id] &&
                                    el.children.map((ele) => {
                                        if (!ele.children) {
                                            return (
                                                <li key={ele.id} className='sub-menu-li'>
                                                    <button
                                                        onClick={(event) => onNavigate(ele, event, el)}
                                                        className='sub-menu-link'
                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        <span>{ele.name}</span>
                                                    </button>
                                                </li>
                                            );
                                        }

                                        return (
                                            <li
                                                onMouseEnter={() => subMenuOnMouseEnterHandler(ele)}
                                                onMouseLeave={() => subMenuOnMouseLeaveHandler(ele)}
                                                key={ele.id}
                                                className='sub-menu-options sub-menu-hover'
                                            >
                                                <div className='sub-menu-div'>
                                                    <span>{ele.name}</span>
                                                    <span className='arrow'>{"-->"}</span>
                                                </div>
                                                <motion.ul
                                                    variants={variants}
                                                    animate={showSubMenu[ele.id] ? "open" : "closed"}
                                                    className='sub-menu-ul'
                                                >
                                                    {showSubMenu[ele.id] &&
                                                        ele.children.map((elem) => {
                                                            return (
                                                                <li key={elem.id} className='grand-child-link'>
                                                                    <button  onClick={(event) => onNavigate(elem, event, el)}>
                                                                        <span>{elem.name}</span>
                                                                    </button>
                                                                </li>
                                                            );
                                                        })}
                                                </motion.ul>
                                            </li>
                                        );
                                    })}
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}