import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button'
const Header=({title , onAdd , showTask})=>{
    const Location=useLocation()
    return(
        <header className="header">
            <h1>{title}</h1>
            {Location.pathname==='/'?<Button color={showTask?"red":"green"}onClick={onAdd} text={showTask?"close":"add"}/>:""}
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