import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todos",
    initialState: {
        items: [
            {
                id: "1",
                title: "Learn React",
                completed: true
            },
            {
                id: "2",
                title: "Read a book",
                completed: false
            }
        ],
        activeTab: "all",
        toggleAll: false,
    },
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.items.push(action.payload);
            },
            prepare: ({ title }) => {
                return {
                    payload: {
                        id: nanoid(),
                        completed: false,
                        title
                    }
                }
            }
        },
        toggle: (state, action) => {
            const id = action.payload;
            const item = state.items.find(item => item.id === id);
            item.completed = !item.completed;
        },
        destroy: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter(item => item.id !== id);
            state.items = filtered;
        },
        changeActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        changeToggleAll: (state) => {
            state.toggleAll = !state.toggleAll;
            const itemsLeft = state.items.filter(item => !item.completed).length;
            if (state.toggleAll) {
                for (let i = 0; i < state.items.length; i++) {
                    state.items[i].completed = true
                }
            } else if(!state.toggleAll && !itemsLeft) {
                for (let i = 0; i < state.items.length; i++) {
                    state.items[i].completed = false
                }
            }
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter(item => item.completed === false);
            state.items = filtered
        },
        itemLeft: (state) => {
            return state.items.filter(item => !item.completed).length;
        }
    }
})

export const selectTodos = state => state.todos.items;

export const selectActiveTabs = state => state.todos.activeTab;

export const selectToggleAll = state => state.todos.toggleAll;

export const { addTodo, toggle, destroy, changeActiveTab, clearCompleted, changeToggleAll} = todoSlice.actions;

export default todoSlice.reducer;
