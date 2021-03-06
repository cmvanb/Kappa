import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodoItem from './TodoItem';
import * as actions from '../../actions';

class TodoForm extends Component {
    componentDidMount() {
        this.props.fetchTodos();
    }

    renderList() {
        return _.chain(this.props.todos)
            .filter(todo => {
                return todo.isCompleted === this.props.showCompleted;
            })
            .map(todo => {
                return (
                    <li key={todo._id}>
                        <TodoItem
                            todo={todo.todo}
                            isCompleted={todo.isCompleted}
                            onToggleCompleted={evt => {
                                evt.preventDefault();
                                this.props.updateTodo(todo._id, {
                                    isCompleted: !todo.isCompleted
                                });
                            }}
                            onDelete={evt => {
                                evt.preventDefault();
                                this.props.deleteTodo(todo._id);
                            }}
                        />
                    </li>
                );
            })
            .value();
    }

    render() {
        return (
            <div>
                <ul>{this.renderList()}</ul>
            </div>
        );
    }
}

const mapStateToProps = ({ todos }) => {
    return { todos };
};

export default connect(mapStateToProps, actions)(TodoForm);
