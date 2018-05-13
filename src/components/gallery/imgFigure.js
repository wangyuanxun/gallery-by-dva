import React from 'react'
import styles from './imgFigure.less'

class ImgFigure extends React.Component {
    getImgPath = (img_name) => {
        return require('../../assets/images/' + img_name);
    }

    handleClick = (e) => {
        if (this.props.arrange.is_center) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        const data = this.props.data,
            arrange = this.props.arrange;

        let styleObj = {}
        if (arrange.pos)
            styleObj = arrange.pos;

        if (arrange.rotate) {
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
                styleObj[value] = 'rotate(' + arrange.rotate + 'deg)';
            });
        }

        return (
            <figure className={styles.imgFigure} style={styleObj} onClick={this.handleClick}>
                <img src={this.getImgPath(data.img_name)} />
                <figcaption>
                    <h2>{data.img_title}</h2>
                </figcaption>
            </figure>
        )
    }
}

export default ImgFigure