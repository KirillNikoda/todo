import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export interface RemoveTodolistActionType {
  type: 'REMOVE-TODOLIST',
  id: string
}

export interface AddTodolistActionType {
  type: 'ADD-TODOLIST',
  title: string
  todolistId: string
}

export interface ChangeTodolistTitleActionType {
  type: 'CHANGE-TODOLIST-TITLE',
  id: string
  title: string
}

export interface ChangeTodolistFilterActionType {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string
  filter: FilterValuesType
}

type ActionTypes = RemoveTodolistActionType |
  AddTodolistActionType |
  ChangeTodolistTitleActionType | ChangeTodolistFilterActionType



const INITIAL_STATE: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = INITIAL_STATE, action: ActionTypes): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [...state, {
        id: action.todolistId,
        title: action.title,
        filter: 'all'
      }]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.filter = action.filter
      }
      return [...state]
    }
    default:
      return state
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}