/**
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './ToastContainer.css'
import Toast from './Toast';

/**
 * ToastContainer
 *
 * Blazzing cool container displaying notifications as little toasts.
 */
export default class ToastContainer extends React.Component {
    static propTypes = {
        notifications: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            notifications: (this.props.notifications) ? this.props.notifications : []
        };
    }

    componentDidUpdate = () => {
        if (this.props.notifications.length > 0) {
            this.setState({ notifications: [...this.state.notifications, ...this.props.notifications] });
        }
    }

    remove = (i) => {
        this.setState({ notifications: this.state.notifications.filter((v, j) => j !== i) })
    }

    render() {
        const toasts = [];
        for (let i = 0; i < this.state.notifications.length && i < 15; i++) {
            const notif = this.state.notifications[i];
            toasts.push(<Toast
                message={notif.message}
                title={notif.title}
                type={notif.type}
                date={notif.date}
                key={i}
                remove={() => this.remove(i)}
            />);
        }

        return (
            <div className="toast-container">
                {toasts}
            </div>
        );
    }
}
