import React from 'react';

class TodoStatic extends React.Component {
  render() {
    const { todo } = this.props;
    const { description, deadline, done } = todo;

    return (
      <li className={done ? 'todo done' : 'todo not-done'}>
        {description},{deadline}
      </li>
    );
  }
}

class StaticList extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <ul className="static list">
        <h2>{name}</h2>
        <TodoStatic
          todo={{ id: 1, description: 'Get out of bed', deadline: '13.9.2017', done: false }}
        />
        <TodoStatic
          todo={{ id: 2, description: 'Brush teeth', deadline: '14.9.2017', done: false }}
        />
        <TodoStatic
          todo={{ id: 3, description: 'Eat breakfast', deadline: '15.9.2017', done: true }}
        />
      </ul>
    );
  }
}

// This component renders form element
const TodoForm = ({ children, name, styleName }) => (
  <form name={name} className={styleName}>
    {children}
  </form>
);

// This component renders given types of input element
const TodoInput = ({ type, name, placeholder, styleName, onChangeFunction }) => (
  <input
    className={styleName}
    placeholder={placeholder}
    onChange={onChangeFunction}
    type={type}
    name={name}
  />
);

// This component renders button element
const TodoButton = ({ onClickFunction, styleName, children }) => (
  <button className={styleName} onClick={onClickFunction}>
    {children}
  </button>
);

// This component renders <li>  items into <ul> element(TodoList component)
const Todo = props => {
  const { todo, toggleDone, removeTodo } = props;
  const { description, deadline, done } = todo;

  return (
    <li className="todo">
      <span onClick={toggleDone} className={done ? 'done' : 'not-done'}>
        {description},{deadline}
      </span>
      <TodoButton styleName="remove" onClickFunction={removeTodo}>
        x
      </TodoButton>
    </li>
  );
};

//This component renders ul element h2 title element for Todo list
const TodoList = ({ name, styleName, children }) => (
  <ul className={styleName}>
    <h2>{name}</h2>
    {children}
  </ul>
);

//This is the main component of the Todo App
export default class PreviousHomeworks extends React.Component {
  state = {
    dynamicList: [
      {
        description: 'Get out of bed',
        deadline: '2017-09-11',
        done: true,
      },
      {
        description: 'Brush teeth',
        deadline: '2017-09-10',
        done: false,
      },
      {
        description: 'Eat breakfast',
        deadline: '2017-09-09',
        done: false,
      },
    ],
    formData: {
      description: '',
      deadline: '',
      done: false,
    },
  };

  toggleDone = index => {
    this.setState(state => (state.dynamicList[index].done = !state.dynamicList[index].done));
  };

  saveInput = event => {
    event.preventDefault();
    const formData = { ...this.state.formData };
    const { name, value } = event.target;
    formData[name] = value;
    this.setState({ formData });
  };

  addTodo = event => {
    event.preventDefault();
    const formData = { ...this.state.formData };
    const dynamicList = [...this.state.dynamicList];
    if (formData.description && formData.deadline) {
      dynamicList.push(formData);
      this.setState({ dynamicList });
    } else {
      alert('Please fill out all fields');
    }
  };

  removeTodo = index => {
    // event.preventDefault();
    const newTodos = [...this.state.dynamicList];
    const filteredTodos = newTodos.filter((todo, todoIndex) => todoIndex !== index);
    this.setState({ dynamicList: filteredTodos });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="app-header">Welcome to Todo App</h1>
        <StaticList name="Static List" />
        <TodoList name="Dynamic List" styleName="color list">
          {this.state.dynamicList.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleDone={() => this.toggleDone(index)}
              removeTodo={() => this.removeTodo(index)}
            />
          ))}
          <TodoForm>
            <TodoInput
              onChangeFunction={this.saveInput}
              type="text"
              name="description"
              placeholder="Enter Todo Name here "
              styleName="input"
            />
            <TodoInput
              onChangeFunction={this.saveInput}
              type="date"
              name="deadline"
              styleName="input"
            />
            <TodoButton onClickFunction={this.addTodo} styleName="add-button">
              Add Todo
            </TodoButton>
          </TodoForm>
        </TodoList>
      </React.Fragment>
    );
  }
}
