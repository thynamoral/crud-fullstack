
const Navbar = (props) => {
    const { isFormPage, setIsFormPage, editing } = props;

    return (
        <nav>
            <a 
                className={`${isFormPage && 'selected'}`}
                onClick={() => {setIsFormPage(true)}}
            >
                Form
                </a>
            <a 
                className={`${!isFormPage && 'selected'}`}
                onClick={() => {
                    setIsFormPage(false)
                    editing(false)
                }}
            >
                User Management
            </a>
        </nav>
    );
}

export default Navbar