import React from 'react'
import styles from './imgNav.less'

class ImgNav extends React.Component {
    handleClick = (e) => {
        if (this.props.arrange.is_center)
            this.props.inverse()
        else
            this.props.center()

        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        const arrange = this.props.arrange

        let spanUnitClassName = styles.span_unit
        if (arrange.is_center)
            spanUnitClassName += ' ' + styles.is_center
        if (arrange.is_inverse)
            spanUnitClassName += ' ' + styles.is_inverse

        return (
            <span className={spanUnitClassName} onClick={this.handleClick}></span>
        )
    }
}

export default ImgNav