import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
`
export const DropdownWrapper = styled.ul`
display: ${props => props.showDropdown ? "block" : "none"};
display: flex;
    list-style: none;
`
export const Li = styled.li`
padding-left: 10px
`

export const MenuItemWrapper = styled.span `
    color: #565D6DFF
`