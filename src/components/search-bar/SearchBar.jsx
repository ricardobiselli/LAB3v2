// import PropTypes from "prop-types";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = () => {
     const [searchWord, setSearchWord] = useState("");

    const handleSearch = () => {
    };

    return (
        <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleSearch}>
                Search
            </Button>
        </Form>
    );
};




export default SearchBar;