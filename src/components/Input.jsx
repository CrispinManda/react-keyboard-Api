import  { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Display from './display';

const Input = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <form className="form-inline my-2 my-lg-0">
                <div className="input-group">
                    <input
                        type="search"
                        className="form-control"
                        id="searchInput"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="searchIcon">
                            <BiSearch />
                        </span>
                    </div>
                </div>
            </form>
            <Display searchTerm={searchTerm} />
        </>
    );
};

export default Input;
