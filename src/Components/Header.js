import PropTypes from 'prop-types'
import Button from './Button'
const Header=({title , onAdd , showTask})=>{
    return(
        <header className="header">
            <h1>{title}</h1>
            <Button color={showTask?"red":"green"}onClick={onAdd} text={showTask?"close":"add"}/>
        </header>
    )
}

Header.defaultProps={
    title:'Task-Tracker'
}
Header.propTypes={
    title:PropTypes.string.isRequired 
}
export default Header;