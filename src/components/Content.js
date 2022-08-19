import React from "react";
import { ContentFooter } from "./Contentfooter";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { toggle, destroy, selectTodos, changeToggleAll, selectActiveTabs, selectToggleAll} from "../redux/todos/todoSlice";


export function Content() {

    const items = useSelector(selectTodos);
    const activeTab = useSelector(selectActiveTabs);
    const toggleAll = useSelector(selectToggleAll);

    const dispatch = useDispatch();

    let filtered = items
    if (activeTab !== "all") {
        filtered = items.filter(item =>
            activeTab === "active" ?
                item.completed === false :
                item.completed === true) 
    }
   
    return (
        <>
            <section className="main">
                <input
                    className="toggle-all"
                    type="checkbox"
                    checked={toggleAll}
                    readOnly
                />
                <label
                    htmlFor="toggle-all"
                    onClick={() => {dispatch(changeToggleAll())}} >
                    Mark all as complete
                </label>

                <ul className="todo-list">

                    {filtered.map(item => (
                        <li key={item.id} className={item.completed ? "completed" : ""}>
                            <div className="view">
                                <input
                                    className="toggle"
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => dispatch(toggle(item.id))}
                                />
                                <label>{item.title}</label>
                                <button className="destroy" onClick={() => dispatch(destroy(item.id))}/>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <ContentFooter />
        </>
    )
}