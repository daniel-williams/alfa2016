import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';

import {Player} from '../components/sky'
require('./Home.less');


export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {
        return (
            <div id='home' className='mb'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <Player />
                  </Col>
                </Row>
              </Grid>
            </div>
        );
    }
});





// $(function () {
//     var $widget = $('#article-widget'),
//         $slides = $('.slides > div', $widget),
//         fadeTime = 1000,
//         pauseTime = 10000,
//         idx = 1;
//
//     function nextSlide() {
//         var $next = $slides.eq(idx++ % $slides.length);
//         var $sibs = $next.siblings();
//
//         $('.controls .item[data-pos="' + $next.data('pos') + '"]', $widget)
//             .addClass('active')
//             .siblings()
//                 .removeClass('active');
//
//         $next
//             .css(
//             {
//                 position: 'relative',
//                 display: 'block',
//                 'z-index': 10,
//             })
//             .fadeTo(fadeTime, 1);
//
//         $sibs
//             .stop(1)
//             .css({
//                 position: 'absolute',
//                 top: 0,
//                 'z-index': 9,
//             })
//             .fadeTo(fadeTime, 0);
//     }
//     //nextSlide();
//     var slideTimeout = setInterval(nextSlide, pauseTime);
//
//     $('.controls .item', $widget).click(function () {
//         clearInterval(slideTimeout);
//         var $this = $(this);
//         $('.controls .item[data-pos='' + $this.data('pos') + '']', $widget).addClass('active').siblings().removeClass('active');
//         idx = $this.data('pos') - 1;
//         nextSlide();
//         slideTimeout = setInterval(nextSlide, pauseTime);
//     });
// });
