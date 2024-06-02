import { useState, useEffect } from 'react'
import { categories } from "../global/global";
import Searchbar from './Searchbar';

function CategoryMenu({currentCategory, chooseCategory, resetPage}) {

    const [isMobile, setIsMobile]         = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 700);
		};
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

    const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	}
    return (
        <nav>
            {isMobile && <Searchbar />}
            {isMobile ? (
                <nav className="category-dropdown">
                    <button className="category-dropdown-btn" onClick={toggleDropdown}>
                        <span className="disc"></span>
                        <label>{currentCategory.title}</label>
                    </button>
                    {showDropdown && (
                        <ul className="dropdown-list">
                            {categories.map((category) => (
                                <li key={category.value}
                                    onClick={() => {
                                        chooseCategory(category);
                                        resetPage();
                                        toggleDropdown();
                                    }}
                                    
                                    className={category.title == currentCategory.title ? "category-dropdown-btn" : ''}>
                                    {category.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>
            ) : (
                <nav className="tab-nav">
                    <ul>
                        {categories.map((category) => (
                            <li key={category.value}
                                className="tab"
                                style={category.title == currentCategory.title ? { listStyleType: 'disc' } : null}
                                onClick={() => { chooseCategory(category); resetPage(); }}>
                                {category.title}
                            </li>
                        ))}

                    </ul>
                </nav>
            )}
        </nav>
    )
}

export default CategoryMenu