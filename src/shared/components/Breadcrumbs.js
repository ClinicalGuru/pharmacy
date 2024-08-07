import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        textTransform: 'capitalize',
        fontSize: '18px',
        lineHeight: '26px', 
        fontWeight: '400',
        color:' black'
    };

    const displayPathnames = pathnames.slice(-2);

    return (
        <div style={breadcrumbStyle}>
            {displayPathnames.map((name, index) => {
                const isLast = index === displayPathnames.length - 1;
                const isSecondToLast = index === displayPathnames.length - 2;
                const displayName = isLast || isSecondToLast ? name.replace(/([a-z])([A-Z])/g, '$1 $2') : '';

                return (
                    <span key={name} style={{ display: 'flex', alignItems: 'center' }}>
                        {isSecondToLast && <span>{displayName}&nbsp; /</span>}
                        {isLast && <span style={{ marginLeft: '0.5rem', color: 'black' }}>{displayName}</span>}
                        {isLast && <span style={{ marginLeft: '0.5rem', marginRight: '1px' }}>&nbsp;&nbsp;</span>}
                    </span>
                );
            })}
        </div>
    );
}
