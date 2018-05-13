import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'dva'
import styles from './index.less'
import ImgFigure from '../../components/gallery/imgFigure'
import ImgNav from '../../components/gallery/imgNav'
import imgData from '../../assets/datas/imgData.json'

class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.center = this.center.bind(this)
        this.inverse = this.inverse.bind(this)
        this.state = {
            imgsArray: [
                {
                    pos: {
                        left: '0',
                        top: '0'
                    },
                    is_center: false,
                    is_inverse: false,
                    rotate: 0
                }
            ]
        }

        this.constant = {}
    }

    componentDidMount() {
        let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            stageHW = Math.ceil(stageW / 2),
            stageHH = Math.ceil(stageH / 2);
        let imgDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgDOM.scrollWidth,
            imgH = imgDOM.scrollHeight,
            imgHW = Math.ceil(imgW / 2),
            imgHH = Math.ceil(imgH / 2);

        // 居中坐标
        this.constant.centerPos = {
            left: stageHW - imgHW,
            top: stageHH - imgHH
        }

        // 左侧右侧取值范围
        this.constant.hPosRange = {
            leftSecX: [-imgHW, stageHW - imgHW * 3],
            rightSecX: [stageHW + imgHW, stageW - imgHW],
            y: [-imgHH, stageH - imgHH]
        }

        // 上侧取值范围
        this.constant.vPosRange = {
            x: [stageHW - imgW, stageHW],
            topY: [-imgHH, stageHH - imgHH * 3]
        }

        this.init(0)
    }

    init = (centerIdx) => {
        let imgsArray = this.state.imgsArray,
            constant = this.constant;

        // 居中
        let centerImgs = imgsArray.splice(centerIdx, 1)
        centerImgs[0] = {
            pos: {
                left: constant.centerPos.left,
                top: constant.centerPos.top
            },
            is_center: true
        };

        // 头部
        let topImgNum = Math.floor((Math.random() * 2)),
            topImgIndex = Math.ceil(Math.random() * (imgsArray.length - topImgNum)),
            topImgs = imgsArray.splice(topImgIndex, topImgNum);

        topImgs.forEach((item, idx) => {
            item = {
                pos: {
                    left: this.getRandom(constant.vPosRange.topY[0], constant.vPosRange.topY[1]),
                    top: this.getRandom(constant.vPosRange.x[0], constant.vPosRange.x[1])
                },
                is_center: false,
                rotate: this.getRandomDeg()
            }
        })

        // 左边 右边
        for (var i = 0; i < imgsArray.length; i++) {
            if (i % 2 == 0) {
                imgsArray[i] = {
                    pos: {
                        left: this.getRandom(constant.hPosRange.leftSecX[0], constant.hPosRange.leftSecX[1]),
                        top: this.getRandom(constant.hPosRange.y[0], constant.hPosRange.y[1])
                    },
                    is_center: false,
                    rotate: this.getRandomDeg()
                }
            } else {
                imgsArray[i] = {
                    pos: {
                        left: this.getRandom(constant.hPosRange.rightSecX[0], constant.hPosRange.rightSecX[1]),
                        top: this.getRandom(constant.hPosRange.y[0], constant.hPosRange.y[1])
                    },
                    is_center: false,
                    rotate: this.getRandomDeg()
                }
            }
        }

        imgsArray.splice(centerIdx, 0, centerImgs[0])
        if (topImgs && topImgs[0])
            imgsArray.splice(topImgIndex, 0, topImgs[0])

        return this.setState({ imgsArray })
    }

    getRandom = (low, high) => {
        return Math.ceil(Math.random() * (high - low) + low)
    }

    getRandomDeg = () => {
        return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30))
    }

    center = (idx) => {
        return () => {
            this.init(idx)
        }
    }

    inverse = (idx) => {
        return () => {
            let imgsArray = this.state.imgsArray;
            imgsArray[idx].is_inverse = !imgsArray[idx].is_inverse
            return this.setState({ imgsArray })
        }
    }

    render() {
        let imgFigures = [],
            imgNavs = [];

        imgData.forEach(function (item, idx) {
            if (!this.state.imgsArray[idx]) {
                this.state.imgsArray[idx] = {
                    pos: {
                        left: '0',
                        top: '0'
                    },
                    is_center: false,
                    is_inverse: false
                }
            }

            imgFigures.push(<ImgFigure key={'imgFigure_' + idx} ref={'imgFigure' + idx} data={item} arrange={this.state.imgsArray[idx]} center={this.center(idx)} inverse={this.inverse(idx)}></ImgFigure>)
            imgNavs.push(<ImgNav key={'imgNav_' + idx} arrange={this.state.imgsArray[idx]} center={this.center(idx)} inverse={this.inverse(idx)}></ImgNav>)
        }.bind(this))

        return (
            <section className={styles.img_section} ref='stage'>
                <section>
                    {imgFigures}
                </section>
                <nav>
                    {imgNavs}
                </nav>
            </section>
        )
    }
}

export default connect()(Gallery)
