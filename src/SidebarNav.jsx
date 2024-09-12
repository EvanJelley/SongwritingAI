import React, { useState, useEffect } from 'react';

const Sidebar = ({ links }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFullyCollapsed, setIsFullyCollapsed] = useState(false);

    // Adjust collapse state based on window size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setIsFullyCollapsed(true);
            } else {
                setIsFullyCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleCollapse = () => {
        if (isFullyCollapsed) {
            setIsFullyCollapsed(false);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    return (
        <div style={isFullyCollapsed ? styles.sidebarFullyCollapsed : isCollapsed ? styles.sidebarCollapsed : styles.sidebar}>
            <button onClick={toggleCollapse} style={styles.collapseButton}>
                {isFullyCollapsed ? '☰' : isCollapsed ? '>' : '<'}
            </button>
            {!isFullyCollapsed && (
                <nav style={styles.nav}>
                    <ul style={styles.navList}>
                        {links.map((link, index) => (
                            <li key={index} style={styles.navItem}>
                                <a href={link.href} style={styles.navLink}>
                                    {link.icon && <span style={styles.icon}>{link.icon}</span>}
                                    {!isCollapsed && link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
};

const styles = {
    sidebar: {
        width: '200px',
        height: '100vh',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
    },
    sidebarCollapsed: {
        width: '60px',
        height: '100vh',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
    },
    sidebarFullyCollapsed: {
        width: '40px',
        height: '100vh',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        position: 'fixed',
        top: 0,
        left: 0,
        alignItems: 'center',
    },
    collapseButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ecf0f1',
        cursor: 'pointer',
        padding: '10px',
        textAlign: 'center',
        fontSize: '18px',
        alignSelf: 'flex-end',
    },
    nav: {
        flex: 1,
        overflowY: 'auto',
        padding: '0px 20px',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    navItem: {
        padding: '10px 20px',
    },
    navLink: {
        textDecoration: 'none',
        color: '#ecf0f1',
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.2s ease',
    },
    icon: {
        marginRight: '10px',
    },
};

export default Sidebar;

