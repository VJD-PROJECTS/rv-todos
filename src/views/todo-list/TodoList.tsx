import React, { useContext } from "react";
import { Store, TodoStatus } from "../../modal";
import { ContextAPI } from "../../context";
import { makeStyles } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from '@material-ui/core/List';
import { TodoListItem } from "./todo-list-item";
import { MAX_HEIGHT } from "../../utils";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        minWidth: 175
    },
    heading: {
        textAlign: "center",
        width: "100%",
        margin: 0,
        background: "#fff",
        borderBottom: "1px solid #b3b3b3"
    },
    list: {
        padding: theme.spacing(0),
        maxHeight: MAX_HEIGHT,
        overflowY: "auto"
    }
}));

export const TodoList = ({ category }: TodoListProps) => {
    const { state, dispatch }: Store = useContext(ContextAPI);
    const classes = useStyles();
    const todoList = state.TodoList;
    return (
        <div className={classes.root}>
            <ListSubheader component="div" className={classes.heading}>
                {
                    (() => {
                        switch (category) {
                            case TodoStatus.OPEN:
                                return "To-Do";
                            case TodoStatus.TODAY:
                                return "Today";
                            case TodoStatus.IN_PROGRESS:
                                return "In Progress";
                            default:
                                return "Done";
                        }
                    })()
                }
            </ListSubheader>
            <List component="nav" className={classes.list}>
                {
                    todoList.map((todo, i) => <TodoListItem todo={todo} key={i} />)
                }
            </List>
        </div>
    );
}

export interface TodoListProps {
    category: TodoStatus;
}