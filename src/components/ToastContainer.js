/**
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './ToastContainer.css'
import Toast from './Toast';

const MAX_DISPLAYED = 15;
/**
 * ToastContainer
 *
 * Blazzing cool container displaying notification as little toasts.
 */
export default class ToastContainer extends React.Component {
    static propTypes = {
        notification: PropTypes.object
    };

    constructor(props) {
        super(props);
        if (this.props.notification){
            this.add(this.props.notification);
        } else {
            this.state = {
                lastNotification: null,
                firstEl: null,
                lastEl: null
            };
        }
    }

    componentDidUpdate = () => {
        if (this.props.notification && this.props.notification !== this.state.lastNotification) {
            this.add(this.props.notification)
        }
    }

    add = (notification) => {
        const result = {};
        result.lastNotification = notification;
        const linkedListElement = {
            notification,
            prev: null,
            next: null
        }
        if (this.state.firstEl == null && this.state.lastEl == null) {
            result.firstEl = linkedListElement;
            result.lastEl = linkedListElement;
        } else {
            this.connect(this.state.lastEl, linkedListElement)
            result.firstEl = this.state.firstEl;
            result.lastEl = linkedListElement
        }
        this.setState(result);
    }

    connect = (prevEl, nextEl) => {
        prevEl.next = nextEl;
        nextEl.prev = prevEl;
    }

    remove = (linkedListElement) => {
        const result = {};
        result.lastNotification = this.state.lastNotification;
        if (linkedListElement.prev && linkedListElement.next) {
            this.connect(linkedListElement.prev, linkedListElement.next);
        } else if (linkedListElement.prev) {
            linkedListElement.prev.next = null;
            result.lastEl = linkedListElement.prev;
            result.firstEl = this.state.firstEl;
        } else if (linkedListElement.next) {
            linkedListElement.next.prev = null
            result.lastEl = this.state.lastEl;
            result.firstEl = linkedListElement.next;
        } else {
            result.lastEl = null;
            result.firstEl = null;
        }
        this.setState(result);
    }

    render() {
        const toasts = [];
        let current = this.state.firstEl;
        let i = 0;
        while (current && i < MAX_DISPLAYED) {
            toasts.push(<Toast
                listEl = {current}
                message={current.notification.message}
                title={current.notification.title}
                type={current.notification.type}
                date={current.notification.date}
                key={i}
                remove={(listEl) => this.remove(listEl)}
            />);
            current = current.next;
            ++i;
        }

        return (
            <div className="toast-container">
                {toasts}
            </div>
        );
    }
}
