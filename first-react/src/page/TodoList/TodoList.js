import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classes from './todolist.module.css';
import Modal from "../../components/Modal/Modal";
import List from "../../components/List/List";
import Paginations from "../../components/Pagination/Paginations";
const TodoList = () => {
    const baseURL = 'https://jsonplaceholder.typicode.com/todos';
    const [ isShow, setIsShow ] = useState(false);
    const [ newTitle, setNewTitle ] = useState('');
    const [ search, setSearch ] = useState('');
    const [ currentEdit, setCurrentEdit ] = useState();
    const [ page, setPage ] = useState(1);
    const [ todoList, setTodoList ] = useState([]);


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

    const handleNext = () => {
        setPage(prev => prev + 1)
    }
    const handlePrev = ( ) => {
        if(page === 1) {
            return;
        }
        setPage(prev => prev - 1);
    }

    const resultSearch = todoList.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));
    const handleGet = async(page) => {
        try {
            const {  data } = await axios.get(baseURL , {
                params: {
                    _limit: 4,
                    _page: page
                }
            });
            setTodoList(data);

        }catch(e) {
            console.log(e);
        }
    }
    useEffect(() => {
        handleGet(page);
    }, [page])

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
            <Paginations
                handlePrev={handlePrev}
                handleNext={handleNext}
                page={page}/>

        </div>
    )
}


export default TodoList;