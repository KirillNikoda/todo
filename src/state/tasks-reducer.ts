import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";



export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  taskId: string,
  todolistId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK',
  todolistId: string,
  title: string
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS',
  isDone: boolean,
  taskId: string,
  todolistId: string
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE',
  todolistId: string,
  title: string,
  taskId: string
}

type ActionTypes = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType


const INITIAL_STATE: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = INITIAL_STATE, action: ActionTypes): TasksStateType => {
  switch(action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      const tasks = state[action.todolistId]
      stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
      return stateCopy
    }
    case 'ADD-TASK': {
      const stateCopy = {...state}
      const newTask = {id: v1(), title: action.title, isDone: false}
      const tasks = stateCopy[action.todolistId]
      stateCopy[action.todolistId] = [newTask, ...tasks]
      return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      const stateCopy = {...state}
      const task = stateCopy[action.todolistId].find(t => t.id === action.taskId)
      if (task) {
        task.isDone = action.isDone
      }
      return stateCopy
    }
    case 'CHANGE-TASK-TITLE': {
      const stateCopy = {...state}
      const task = stateCopy[action.todolistId].find(t => t.id === action.taskId)
      if (task) {
        task.title = action.title
      }
      return stateCopy
    }
    case 'ADD-TODOLIST': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = []
      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state}
      delete stateCopy[action.id]
      return stateCopy
    }
    default:
      return state
  }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todolistId, taskId }
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
  return { type: 'ADD-TASK', todolistId, title }
}

export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todolistId: string
): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId }
}


export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', todolistId, title, taskId }
}