/**
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Toast.css'
import TimeAgo from 'react-timeago'


/**
 * ToastContainer
 *
 * Blazzing cool container displaying notifications as little toasts.
 */
export default class Toast extends React.Component {
    static propTypes = {
        message: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        type: PropTypes.string, // secondary | success | info | warning | danger
        remove: PropTypes.func,
        listEl: PropTypes.object,
    };

    constructor(props) {
        super(props);
        let date = this.props.date

        if (!date) {
            date = new Date();
        }
        this.state = {
            hide: false,
            date
        };
    }

    handleClick = () => {
        this.setState({ ...this.state, hide: true });
        setTimeout(() => {
            this.setState({ ...this.state, hide: false });
            this.props.remove(this.props.listEl)
        }, 550);
    }

    render() {
        let hidedStyle;
        if (this.state.hide) {
            hidedStyle = {
                opacity: 0,
            }
        }
        return (
            <div className="toast --blue" style={hidedStyle} role="alert" aria-live="assertive" aria-atomic="true" >
                <div className={"toast-header " + this.props.type}>
                    <strong className="mr-auto" dangerouslySetInnerHTML={{ __html: this.props.title }} />
                    <small><TimeAgo date={this.state.date} /></small>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={this.handleClick}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body" dangerouslySetInnerHTML={{ __html: this.props.message }} />
            </div>
        );
    }
}
