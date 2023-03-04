import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classes from './todolist.module.css';
import Modal from "../../components/Modal/Modal";
import List from "../../components/List/List";
const TodoList = () => {
    const [ isShow, setIsShow ] = useState(false);
    const [ newTitle, setNewTitle ] = useState('');
    const [ search, setSearch ] = useState('');
    const [ currentEdit, setCurrentEdit ] = useState();
    const [ todoList, setTodoList ] = useState([])


    const handleShow = () => setIsShow(!isShow);
    const handleAdd = () => {
        setTodoList((prevTodo) => {
            return [ ...prevTodo, { id: todoList.length + 1 , title: newTitle, completed: false  } ]
        })
        setNewTitle('')
        handleShow()
    }
    const handleDone = (id) => {
        const currentIndex = todoList.findIndex((todo) => todo.id === id);
        todoList[currentIndex].completed = !todoList[currentIndex].completed;
        setTodoList([...todoList]);
    }

    const handleChangeText = (event) => {
        setNewTitle(event.target.value);
    }

    const handleDelete = (id) => {
        const filtered = todoList.filter(todo => todo.id !== id)
        setTodoList([...filtered])
    }


    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const handleEdit = (editTodo) => {
        const editList = todoList.map(todo => {
            if(todo.id === editTodo.id) {
                return { ...todo, title: editTodo.title }
            }
            return todo;
        })
        setTodoList([...editList]);
        setCurrentEdit()
    }


    const resultSearch = todoList.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));


    useEffect(() => {
        const myLocalList = JSON.parse(localStorage.getItem('todoList'));
        if(myLocalList?.length !== 0) {
            setTodoList(myLocalList);
        }

    },[])


    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList))
        return () => {

        }
    }, [todoList])


    return (
        <div className={classes.wrapper}>
            <Button onClick={handleShow}>
                Добавить
            </Button>
            <Input
                placeholder={'search...'}
                onChange={handleSearch}
                value={search}
                name={'search'}
            />
            <button  className={classes.deleteall} onClick={()=> setTodoList([])}>delete all</button>

            { isShow && <Modal handleShow={handleShow}>
                <p>{newTitle}</p>
                <Input
                    placeholder={'Добавить'}
                    onChange={handleChangeText}
                    name={'add'}
                    value={newTitle}
                />
                <Button onClick={handleAdd}>
                    Добавить
                </Button>
                <button onClick={handleShow} className={classes.close}>Close</button>
            </Modal> }
            <List
                list={resultSearch}
                handleChangeCurrent={setCurrentEdit}
                handleDone={handleDone}
                handleDelete={handleDelete}
                currentEdit={currentEdit}
                handleEdit={handleEdit}
            />
        </div>
    )
}


export default TodoList;