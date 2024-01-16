import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    };

    const displayPathnames = pathnames.slice(-2);

    return (
        <div style={breadcrumbStyle}>
            {displayPathnames.map((name, index) => {
                const isLast = index === displayPathnames.length - 1;
                const isSecondToLast = index === displayPathnames.length - 2;
                const displayName = isLast || isSecondToLast ? name : '';

                return (
                    <span key={name} style={{ display: 'flex', alignItems: 'center' }}>
                        {isSecondToLast && <span>{displayName}&nbsp; /</span>}
                        {isLast && <span style={{ marginLeft: isSecondToLast ? '2px' : '2px' }}>{displayName}</span>}
                        {isLast ? null : <span style={{ marginLeft: '2px', marginRight: '2px' }}>&nbsp;&nbsp;</span>}
                    </span>
                );
            })}
        </div>



    );
}